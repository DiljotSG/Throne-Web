import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Comment, Avatar, Divider, Empty,
} from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { WASHROOM_RATING_CATEGORIES } from '../constants/WashroomRatingCategories';
import { ratingAsEmoji } from '../utils/DisplayUtils';

const Reviews = ({ reviews }) => {
  if (isEmpty(reviews)) {
    return <Empty description="No reviews yet." />;
  }

  return (
    reviews.map((review) => (
      <Comment
        className="washroom-review"
        key={review.created_at}
        author={review.user.username}
        avatar={(
          <Avatar>
            {review.user.username.charAt(0).toUpperCase()}
          </Avatar>
          )}
        datetime={moment(review.created_at).fromNow()}
        content={(
          <Row>
            <Col sm={14} md={16} className="washroom-review-comment">
              {review.comment}
            </Col>
            <Col sm={10} md={8} className="washroom-review-rating">
              { WASHROOM_RATING_CATEGORIES.map((type, i) => (
                <React.Fragment key={type}>
                  {i > 0 ? <Divider type="vertical" /> : ''}
                  {ratingAsEmoji(type)}
                  {review.ratings[type]}
                </React.Fragment>
              ))}
            </Col>
          </Row>
        )}
      />
    ))
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      created_at: PropTypes.string,
      washroom_id: PropTypes.number,
      id: PropTypes.number,
      ratings: PropTypes.shape({
        cleanliness: PropTypes.number,
        privacy: PropTypes.number,
        smell: PropTypes.number,
        toilet_paper_quality: PropTypes.number,
      }),
      user: PropTypes.shape({
        created_at: PropTypes.string,
        id: PropTypes.number,
        profile_picture: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default Reviews;
