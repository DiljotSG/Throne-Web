import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Typography, Rate,
} from 'antd';

import { NavLink } from 'react-router-dom';
import { roundToHalf } from '../utils/NumUtils';
import './BuildingListItem.css';

const { Title, Text } = Typography;

const BuildingListItem = ({ item }) => (
  <NavLink
    to={{
      pathname: `/buildings/${item.id}`,
      state: { building: item },
    }}
    className="list-item"
  >
    <Row>
      <Col span={20}>
        <Text strong>
          {item.title}
        </Text>
        <div className="in-line">
          <Text>
            {`Washrooms: ${item.washroom_count}`}
          </Text>
        </div>
        <div className="in-line">
          <Rate
            disabled
            value={roundToHalf(item.overall_rating)}
            allowHalf
            className="list-item-rating"
          />
        </div>
      </Col>
      <Col span={4}>
        <div className="list-item-distance">
          Distance
          <Title
            className="list-item-distance-value"
            level={4}
          >
            19m
          </Title>
        </div>
      </Col>
    </Row>
  </NavLink>
);

BuildingListItem.propTypes = {
  item: PropTypes.shape({
    best_ratings: PropTypes.shape({
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
  }),
};

BuildingListItem.defaultProps = {
  item: {},
};

export default BuildingListItem;
