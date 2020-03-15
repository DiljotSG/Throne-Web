import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Comment, Input, Button, Typography, Alert,
} from 'antd';
import { isEmpty } from 'lodash';

import WashroomRatings from './WashroomRatings';

const { TextArea } = Input;
const { Title } = Typography;

const ReviewForm = ({
  review, onSubmit, commentChange, ratingChange, submitting, errors, created, attemptedSubmit,
}) => (
  <Row gutter={[16, 16]}>
    <Title level={4}>
      Leave a review
    </Title>
    <Col md={12} lg={8}>
      <WashroomRatings
        readOnly={false}
        averageRatings={review.ratings}
        allowHalf={false}
        onChange={ratingChange}
      />
    </Col>
    <Col md={12} lg={16}>
      <Comment
        className="review-form-comment"
        content={(
          <TextArea
            rows={4}
            value={review.comment}
            onChange={commentChange}
          />
        )}
      />
    </Col>
    <Button
      className="review-form-submit"
      disabled={!isEmpty(errors) && attemptedSubmit}
      loading={submitting}
      onClick={onSubmit}
      type="primary"
    >
      New Review
    </Button>
    <Col span={24}>
      {!isEmpty(errors) && attemptedSubmit && (
        <Alert
          message={errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
          type="error"
          showIcon
          closable
        />
      )}
      {created && (
        <Alert
          message="Submitted review"
          type="success"
          showIcon
          closable
        />
      )}
    </Col>
  </Row>
);

ReviewForm.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string,
    ratings: PropTypes.shape({
      cleanliness: PropTypes.number,
      privacy: PropTypes.number,
      smell: PropTypes.number,
      toilet_paper_quality: PropTypes.number,
    }),
  }).isRequired,
  onSubmit: PropTypes.func,
  commentChange: PropTypes.func,
  ratingChange: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  created: PropTypes.bool,
  attemptedSubmit: PropTypes.bool,
};

ReviewForm.defaultProps = {
  onSubmit: () => {},
  commentChange: () => {},
  ratingChange: () => {},
  submitting: false,
  errors: [],
  created: false,
  attemptedSubmit: false,
};

export default ReviewForm;
