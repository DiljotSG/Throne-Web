import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

const starFilled = (currentIndex, rating) => (
  currentIndex < rating
);

const StarRating = ({ rating, total }) => (
  <div className="StarRating">
    {[...Array(total)].map((x, i) => (
      <Icon
        type="star"
        theme={starFilled(i, rating) ? 'filled' : ''}
        className={starFilled(i, rating) ? 'star-filled' : 'star-empty'}
      />
    ))}
  </div>
);

StarRating.propTypes = {
  rating: PropTypes.number,
  total: PropTypes.number,
};

StarRating.defaultProps = {
  rating: 0,
  total: 5,
};

export default StarRating;
