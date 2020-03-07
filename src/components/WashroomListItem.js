import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import {
  Row, Col, Typography, Divider, Rate,
} from 'antd';

import { NavLink } from 'react-router-dom';
import { roundToHalf } from '../utils/NumUtils';
import './WashroomListItem.css';

const { Title, Text } = Typography;

const renderFavoriteIcon = (isFavourite) => {
  if (isFavourite) {
    return (
      <>
        <Divider type="vertical" />
        <span
          aria-label="Favorite"
          role="img"
          className="list-item-favorite"
        >
          👑
        </span>
      </>
    );
  }

  return null;
};

const WashroomListItem = ({ item }) => (

  <NavLink
    to={{
      pathname: `/washrooms/${item.id}`,
      state: { washroom: item },
    }}
    className="list-item"
  >
    <Row>
      <Col span={20}>
        <Text
          className="list-item-comment"
          strong
        >
          {item.comment}
        </Text>
        <div className="in-line">
          <Rate
            disabled
            value={roundToHalf(item.overall_rating)}
            allowHalf
            className="list-item-rating"
          />
          <Divider type="vertical" />
          <Text className="list-item-floor">
            {`Floor ${item.floor}`}
          </Text>
          <Divider type="vertical" />
          <Text className="list-item-gender">
            {startCase(item.gender)}
          </Text>
          {renderFavoriteIcon(item.is_favorite)}
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

WashroomListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    overall_rating: PropTypes.number.isRequired,
    floor: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    is_favorite: PropTypes.bool.isRequired,
  }),
};

WashroomListItem.defaultProps = {
  item: {},
};

export default WashroomListItem;
