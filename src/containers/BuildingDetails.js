import React, { Component } from 'react';
import {
  List, Typography, Spin, Rate, Row,
} from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuilding } from '../actions/buildingActions';
import { getWashroomsForBuilding } from '../actions/washroomActions';
import { roundToHalf } from '../utils/NumUtils';
import './BuildingDetails.css';

import { WashroomListItem } from '../components';

const { Title, Text } = Typography;

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

    if (buildingFetching) {
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
            { 'Building: ' }
          </Text>
          <Rate
            className="rate-overall-color"
            disabled
            value={roundToHalf(building.overall_rating)}
          />
        </Row>
        <Row>
          <Text>
            Washrooms Inside
          </Text>
        </Row>
        <List
          className="near-me-list"
          loading={washroomsFetching}
          bordered
          dataSource={buildingWashrooms}
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
    washrooms: buildingWashrooms,
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
    best_rating: PropTypes.shape({
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
