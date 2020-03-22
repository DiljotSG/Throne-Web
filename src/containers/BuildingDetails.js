import React, { Component } from 'react';
import {
  List, Typography, Spin, Rate, Row, Empty, Skeleton,
} from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getBuilding } from '../actions/buildingActions';
import { getWashroomsForBuilding } from '../actions/washroomActions';
import { roundToHalf } from '../utils/NumUtils';
import './BuildingDetails.css';

import { WashroomListItem } from '../components';

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

  render() {
    const {
      building,
      buildingFetching,
      buildingWashrooms,
      washroomsFetching,
    } = this.props;

    if (buildingFetching || isEmpty(building)) {
      return (<Spin />);
    }

    return (
      <>
        <Title
          className="details-title"
          level={2}
        >
          { building.title }
        </Title>
        <Row>
          <Text>
            { 'Building rating: ' }
          </Text>
          <Rate
            className="building-rate-overall"
            disabled
            value={roundToHalf(building.overall_rating)}
          />
        </Row>
        <Row>
          <Title
            level={4}
            className="washroom-list-header"
          >
            Washrooms Inside
          </Title>
          {
            washroomsFetching
              ? <Skeleton active title={false} />
              : renderWashrooms(buildingWashrooms)
          }
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
    isFetching: washroomsFetching,
    status: washroomsStatus,
  } = state.washroomReducer;
  return {
    building,
    buildingFetching,
    buildingStatus,
    buildingWashrooms,
    washroomsFetching,
    washroomsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBuilding: (id) => dispatch(getBuilding(id)),
  getWashroomsForBuilding: (id) => dispatch(getWashroomsForBuilding(id)),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
