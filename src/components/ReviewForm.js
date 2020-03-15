import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Comment, Form, Input, Button, Typography, Alert,
} from 'antd';
import { isEmpty } from 'lodash';

import WashroomRatings from './WashroomRatings';

const { TextArea } = Input;
const { Title } = Typography;

const Editor = ({
  onChange, onSubmit, submitting, value, valid,
}) => (
  <>
    <Form.Item>
      <TextArea rows={4} value={value} onChange={onChange} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        disabled={!valid}
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const ReviewForm = ({
  review, onSubmit, commentChange, ratingChange, submitting, errors, created, attemptedSubmit,
}) => (
  <Row gutter={[16, 16]}>
    <Title level={4}>
      Leave a review
    </Title>
    <Col md={12} lg={16}>
      <Comment
        content={(
          <Editor
            onSubmit={onSubmit}
            submitting={submitting}
            onChange={commentChange}
            value={review.comment}
            valid={isEmpty(errors) || !attemptedSubmit}
          />
        )}
      />
    </Col>
    <Col md={12} lg={8}>
      <WashroomRatings
        readOnly={false}
        averageRatings={review.ratings}
        allowHalf={false}
        onChange={ratingChange}
      />
    </Col>
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

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default ReviewForm;
