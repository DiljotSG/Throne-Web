import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Typography, Divider, Rate, Icon,
} from 'antd';

import { NavLink } from 'react-router-dom';
import { roundToHalf } from '../utils/NumUtils';
import { genderAsEmoji, displayDistance } from '../utils/DisplayUtils';
import './WashroomListItem.css';

const { Text } = Typography;

const renderFavoriteIcon = (isFavorite) => {
  if (isFavorite) {
    return (
      <>
        <Divider type="vertical" />
        <span
          aria-label="Favorite"
          role="img"
          className="list-item-favorite"
        >
          <Icon
            type="heart"
            theme="filled"
            className="washroom-list-icon-heart"
          />
        </span>
      </>
    );
  }

  return null;
};

const renderViewItem = (item, buildingView) => {
  if (buildingView) {
    return (
      <Col span={20}>
        <Text
          className="washroom-list-item-building-title"
          strong
        >
          {item.comment}
          {renderFavoriteIcon(item.is_favorite)}
        </Text>
        <div className="in-line">
          <Text className="list-item-gender">
            {genderAsEmoji(item.gender)}
          </Text>
          <Divider type="vertical" />
          <Text className="list-item-floor">
            {`Floor ${item.floor}`}
          </Text>
        </div>
        <div className="in-line">
          <Rate
            disabled
            value={roundToHalf(item.overall_rating)}
            allowHalf
            className="washroom-list-item-rating"
          />
        </div>
      </Col>
    );
  }
  return (
    <Col span={20}>
      <Text
        className="washroom-list-item-building-title"
        strong
      >
        {item.building_title}
        {renderFavoriteIcon(item.is_favorite)}
      </Text>
      <div className="in-line">
        <Text className="list-item-gender">
          {genderAsEmoji(item.gender)}
        </Text>
        <Divider type="vertical" />
        <Text className="list-item-floor">
          {`Floor ${item.floor}`}
        </Text>
        {item.comment
          && <Divider type="vertical" />}
        {item.comment
          && (
          <Text className="washroom-list-item-comment">
            {item.comment}
          </Text>
          )}
      </div>
      <div className="in-line">
        <Rate
          disabled
          value={roundToHalf(item.overall_rating)}
          allowHalf
          className="washroom-list-item-rating"
        />
      </div>
    </Col>
  );
};


const WashroomListItem = ({ item, buildingView }) => (

  <NavLink
    to={`/washrooms/${item.id}`}
    className="washroom-list-item"
  >
    <Row type="flex" justify="space-around" align="middle">
      {renderViewItem(item, buildingView)}
      <Col span={4}>
        {item.distance
          && (
          <div className="washroom-list-item-distance">
            <Text
              className="washroom-list-item-distance-value"
              strong
            >
              {displayDistance(item.distance)}
            </Text>
          </div>
          )}
      </Col>
    </Row>
  </NavLink>

);

WashroomListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    building_title: PropTypes.string.isRequired,
    overall_rating: PropTypes.number.isRequired,
    floor: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    is_favorite: PropTypes.bool.isRequired,
    distance: PropTypes.number,
  }),
  buildingView: PropTypes.bool,
};

WashroomListItem.defaultProps = {
  item: {},
  buildingView: false,
};

export default WashroomListItem;
