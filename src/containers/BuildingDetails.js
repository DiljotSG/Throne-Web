import React, { Component } from 'react';
import {
  List, Typography, Spin, Rate, Row, Col, Empty, Skeleton, Button, Modal, notification,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, startCase, isInteger } from 'lodash';
import { getBuilding } from '../actions/buildingActions';
import { getWashroomsForBuilding, createWashroom } from '../actions/washroomActions';
import { roundToHalf } from '../utils/NumUtils';
import { WashroomListItem, WashroomForm } from '../components';
import { getTerminology, buildingTabName } from '../utils/DisplayUtils';

import './BuildingDetails.css';

const { Title, Text } = Typography;

const washroomDefault = {
  comment: '',
  gender: 'all',
  floor: 0,
  stall_count: 1,
  urinal_count: 0,
  building_id: 0,
  amenities: [],
};

const renderWashrooms = ((washrooms) => {
  if (isEmpty(washrooms)) {
    const description = `No ${getTerminology()}s yet`;
    return <Empty description={description} />;
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
          <WashroomListItem item={item} buildingTitle />
        </List.Item>
      )}
    />
  );
});

class BuildingDetails extends Component {
  constructor() {
    super();
    this.state = {
      washroom: washroomDefault,
      attemptedSubmit: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.getBuilding(id);
    this.getWashroomsForBuilding(id);
  }

  componentDidUpdate(prevProp, prevState) {
    const { building, buildingFetching, washroomStatus } = this.props;
    const { washroom, modalVisible } = this.state;

    document.title = buildingTabName(building, buildingFetching);

    if (modalVisible && prevState.modalVisible && prevState.washroom === washroom) {
      if (washroomStatus === 201) {
        this.closeModal();
        notification.success({
          message: `${startCase(getTerminology())} Added`,
          duration: 3,
        });
      } else if (washroomStatus >= 400) {
        notification.error({
          message: `Could Not Add ${startCase(getTerminology())}`,
          duration: 3,
        });
      }
    }
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

  handleSubmit = () => {
    const { building } = this.props;

    this.setState({ attemptedSubmit: true });
    this.createWashroom(building);
    this.setState({ attemptedSubmit: false });
  }

  handleChange = (key, value) => {
    const { washroom } = this.state;

    this.setState({
      washroom: {
        ...washroom,
        [key]: this.validateField(key, value),
      },
    });
  }

  validateField = (key, value) => {
    const { washroom } = this.state;
    if (typeof (washroom[key]) === 'number' && !isInteger(value)) {
      return washroomDefault[key];
    }
    return value;
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      washroom: washroomDefault,
    });
  };

  render() {
    const {
      building,
      buildingFetching,
      buildingWashrooms,
      washroomsFetching,
      creatingWashroom,
      history,
    } = this.props;

    const {
      washroom,
      attemptedSubmit,
      modalVisible,
    } = this.state;

    const okProps = {
      disabled: attemptedSubmit,
      loading: creatingWashroom,
      className: 'washroom-create-submit',
    };

    if (buildingFetching || isEmpty(building)) {
      return (<Spin />);
    }

    return (
      <>
        <Button
          shape="round"
          onClick={history.goBack}
          icon="arrow-left"
          size="large"
          className="back-button"
        />
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
            disabled
            className="building-rate-overall"
            allowHalf
            value={roundToHalf(building.overall_rating)}
          />
        </Row>
        <Row>
          <Col span={12}>
            <Title
              level={4}
              className="washroom-list-header"
            >
              {`${startCase(getTerminology())}s Inside`}
            </Title>
          </Col>
          <Col span={12} className="washroom-add-button">
            <Button
              type="primary"
              onClick={this.showModal}
              className="washroom-display-modal"
              icon="plus"
            >
              {`Add ${startCase(getTerminology())}`}
            </Button>
          </Col>
        </Row>
        <Row>
          {
            washroomsFetching
              ? <Skeleton active title={false} />
              : renderWashrooms(buildingWashrooms)
          }
        </Row>
        <Modal
          width="580px"
          title={`New ${startCase(getTerminology())}`}
          visible={modalVisible}
          okText="Add"
          okButtonProps={okProps}
          onOk={this.handleSubmit}
          onCancel={this.closeModal}
        >
          <WashroomForm
            washroom={washroom}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />
        </Modal>
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
      cleanliness: PropTypes.number,
      privacy: PropTypes.number,
      smell: PropTypes.number,
      toilet_paper_quality: PropTypes.number,
    }),
    created_at: PropTypes.string,
    id: PropTypes.number,
    maps_service_id: PropTypes.number,
    overall_rating: PropTypes.number,
    title: PropTypes.string,
    washroom_count: PropTypes.number,
  }).isRequired,
  createWashroom: PropTypes.func.isRequired,
  creatingWashroom: PropTypes.bool,
  washroomStatus: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

BuildingDetails.defaultProps = {
  buildingWashrooms: [],
  washroomsFetching: false,
  buildingFetching: false,
  creatingWashroom: false,
  washroomStatus: 0,
  history: {
    goBack: () => { },
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
