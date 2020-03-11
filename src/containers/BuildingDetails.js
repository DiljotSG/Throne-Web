import React, { Component } from 'react';
import {
  List, Spin, Typography,
} from 'antd';

import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getBuilding } from '../actions/buildingActions';
import { getWashroomsForBuilding } from '../actions/washroomActions';
import './BuildingDetails.css';

import { WashroomListItem } from '../components';

const { Title } = Typography;

class BuildingDetails extends Component {
  componentDidMount() {
    const { match, building, washrooms } = this.props;
    const { id } = match.params;

    if (building.id !== id) {
      this.getBuilding(id);
    }
    if (washrooms.length === 0) {
      this.getWashroomsForBuilding(building.id);
    }
  }

  getBuilding = (id) => {
    const { getBuilding } = this.props; // eslint-disable-line no-shadow
    getBuilding(id);
  }

  getWashroomsForBuilding = (id) => {
    // eslint-disable-next-line react/prop-types
    const { getWashroomsForBuilding } = this.props; // eslint-disable-line no-shadow
    getWashroomsForBuilding(id);
  }

  render() {
    let buildingItem;

    const {
      location,
      building,
      washrooms,
      washroomsFetching,
    } = this.props;

    try {
      buildingItem = location.state.building;
    } catch (TypeError) {
      buildingItem = building;
    }

    if (isEmpty(buildingItem)) {
      return (<Spin />);
    }

    return (
      <>
        <Title className="details-title" level={2}>
          {`${buildingItem.title}`}
        </Title>
        <List
          className="near-me-list"
          loading={washroomsFetching}
          bordered
          dataSource={washrooms}
          renderItem={(item) => (
            <List.Item
              className="near-me-list-item"
              key={item.id}
            >
              <WashroomListItem item={item} />
            </List.Item>
          )}
        />
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
    washrooms,
    isFetching: washroomsFetching,
    status: washroomsStatus,
  } = state.washroomReducer;
  return {
    building,
    buildingFetching,
    buildingStatus,
    washrooms,
    washroomsFetching,
    washroomsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBuilding: (id) => dispatch(getBuilding(id)),
  getWashroomsForBuilding: (id) => dispatch(getWashroomsForBuilding(id)),
});

BuildingDetails.propTypes = {
  washrooms: PropTypes.instanceOf(Array),
  buildings: PropTypes.instanceOf(Array),
  getWashrooms: PropTypes.func.isRequired,
  getBuilding: PropTypes.func.isRequired,
  washroomsFetching: PropTypes.bool,
  buildingsFetching: PropTypes.bool,
  building: PropTypes.shape({
    best_rating: PropTypes.shape({
      cleanliness: PropTypes.number.isRequired,
      privacy: PropTypes.number.isRequired,
      smell: PropTypes.number.isRequired,
      toilet_paper_quality: PropTypes.number.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    maps_service_id: PropTypes.number.isRequired,
    overall_rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    washroom_count: PropTypes.number.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      building: PropTypes.object,
    }),
  }),
};

BuildingDetails.defaultProps = {
  washrooms: [],
  buildings: [],
  washroomsFetching: false,
  buildingsFetching: false,
  buildingFetching: false,
  washroomFetching: false,
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: {},
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
