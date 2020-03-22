import React, { Component } from 'react';
import {
  List, Typography, Spin, Rate, Row, Empty, Skeleton,
} from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getBuilding } from '../actions/buildingActions';
import { getWashroomsForBuilding, createWashroom } from '../actions/washroomActions';
import { roundToHalf } from '../utils/NumUtils';
import './BuildingDetails.css';
import { ERROR_WASHROOM_EMPTY_COMMENT } from '../constants/Messages';
import { WashroomListItem, WashroomForm } from '../components';

const { Title, Text } = Typography;

const renderWashrooms = ((washrooms) => {
  if (isEmpty(washrooms)) {
    return <Empty description="No washrooms yet" />;
  }
  return (
    <List
      className="near-me-list"
      bordered
      dataSource={washrooms}
      renderItem={(item) => (
        <List.Item
          className="near-me-list-item"
          key={item.id}
        >
          <WashroomListItem item={item} BuildingTitle />
        </List.Item>
      )}
    />
  );
});

class BuildingDetails extends Component {
  constructor() {
    super();
    this.state = {
      washroom: {
        comment: '',
        gender: 'all',
        floor: 1,
        stall_count: 1,
        urinal_count: 0,
        building_id: 0,
        amenities: [],
      },
      attemptedSubmit: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.getBuilding(id);
    this.getWashroomsForBuilding(id);
  }

  getBuilding = (id) => {
    const { getBuilding } = this.props; // eslint-disable-line no-shadow
    getBuilding(id);
  }

  getWashroomsForBuilding = (id) => {
    const { getWashroomsForBuilding } = this.props; // eslint-disable-line no-shadow
    getWashroomsForBuilding(id);
  }

  createWashroom = (building) => {
    const { createWashroom } = this.props; // eslint-disable-line no-shadow
    const { washroom } = this.state;

    createWashroom(building, washroom);
  }

  handleSubmit = async () => {
    await this.validate();

    const { errors } = this.state;
    const { building } = this.props;

    this.setState({ attemptedSubmit: true });
    if (isEmpty(errors)) {
      this.createWashroom(building);
      this.setState({ attemptedSubmit: false });
    }
  }

  handleGenderChange = (event) => {
    const { washroom } = this.state;
    this.setState(
      {
        washroom: {
          ...washroom,
          gender: event.target.value,
        },
      },
      this.validate,
    );
  };

  handleFloorChange = (value) => {
    const { washroom } = this.state;
    this.setState(
      {
        washroom: {
          ...washroom,
          floor: value,
        },
      },
      this.validate,
    );
  }

  handleStallChange = (value) => {
    const { washroom } = this.state;
    this.setState(
      {
        washroom: {
          ...washroom,
          stall_count: value,
        },
      },
      this.validate,
    );
  }

  handleUrinalChange = (value) => {
    const { washroom } = this.state;
    this.setState(
      {
        washroom: {
          ...washroom,
          urinal_count: value,
        },
      },
      this.validate,
    );
  }

  handleCommentChange = (event) => {
    const { washroom } = this.state;
    this.setState(
      {
        washroom: {
          ...washroom,
          comment: event.target.value,
        },
      },
      this.validate,
    );
  }

  handleAmenityChange = (value) => {
    const { washroom } = this.state;
    this.setState(
      {
        washroom: {
          ...washroom,
          amenities: value,
        },
      },
      this.validate,
    );
  }

  validate = () => {
    const { washroom } = this.state;
    const errors = [];

    if (washroom.comment.length === 0) {
      errors.push(ERROR_WASHROOM_EMPTY_COMMENT);
    }

    if (washroom.gender === 'women') {
      washroom.urinal_count = 0;
    }

    this.setState({
      errors,
    });
  }

  render() {
    const {
      building,
      buildingFetching,
      buildingWashrooms,
      washroomsFetching,
      creatingWashroom,
      washroomStatus,
    } = this.props;

    const { washroom, errors, attemptedSubmit } = this.state;

    if (buildingFetching) {
      return (<Spin />);
    }

    return (
      <>
        <Title
          className="details-title"
          level={2}
        >
          {building.title}
        </Title>
        <Row>
          <Text>
            {'Building rating: '}
          </Text>
          <Rate
            className="building-rate-overall"
            disabled
            value={roundToHalf(building.overall_rating)}
          />
        </Row>
        <Row>
          <Title level={4}>
            Washrooms Inside
          </Title>
          {
            washroomsFetching
              ? <Skeleton active title={false} />
              : renderWashrooms(buildingWashrooms)
          }
          <WashroomForm
            washroom={washroom}
            onSubmit={this.handleSubmit}
            onGenderChange={this.handleGenderChange}
            onFloorChange={this.handleFloorChange}
            onStallChange={this.handleStallChange}
            onUrinalChange={this.handleUrinalChange}
            onCommentChange={this.handleCommentChange}
            onAmenityChange={this.handleAmenityChange}
            submitting={creatingWashroom}
            errors={errors}
            created={washroomStatus === 201}
            attemptedSubmit={attemptedSubmit}
          />
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    building,
    isFetching: buildingFetching,
    status: buildingStatus,
  } = state.buildingReducer;
  const {
    buildingWashrooms,
    creatingWashroom,
    isFetching: washroomsFetching,
    washroom: createdWashroom,
    status: washroomStatus,
  } = state.washroomReducer;

  return {
    building,
    buildingFetching,
    buildingStatus,
    buildingWashrooms,
    washroomsFetching,
    washroomStatus,
    creatingWashroom,
    createdWashroom,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBuilding: (id) => dispatch(getBuilding(id)),
  getWashroomsForBuilding: (id) => dispatch(getWashroomsForBuilding(id)),
  createWashroom: (building, washroom) => dispatch(createWashroom(building, washroom)),
});

BuildingDetails.propTypes = {
  buildingWashrooms: PropTypes.instanceOf(Array),
  getWashroomsForBuilding: PropTypes.func.isRequired,
  getBuilding: PropTypes.func.isRequired,
  washroomsFetching: PropTypes.bool,
  buildingFetching: PropTypes.bool,
  building: PropTypes.shape({
    best_ratings: PropTypes.shape({
      cleanliness: PropTypes.number.isRequired,
      privacy: PropTypes.number.isRequired,
      smell: PropTypes.number.isRequired,
      toilet_paper_quality: PropTypes.number.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    maps_service_id: PropTypes.number.isRequired,
    overall_rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    washroom_count: PropTypes.number.isRequired,
  }).isRequired,
  createWashroom: PropTypes.func.isRequired,
  creatingWashroom: PropTypes.bool,
  washroomStatus: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

BuildingDetails.defaultProps = {
  buildingWashrooms: [],
  washroomsFetching: false,
  buildingFetching: false,
  creatingWashroom: false,
  washroomStatus: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
