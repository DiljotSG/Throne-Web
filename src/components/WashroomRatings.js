import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Rate,
} from 'antd';
import { startCase, kebabCase } from 'lodash';
import { roundToHalf } from '../utils/NumUtils';
import { ratingAsEmoji } from '../utils/DisplayUtils';
import './WashroomListItem.css';

const WashroomRatings = ({ washroom, readOnly, onChange }) => (
  <>
    { readOnly && (
      <Row>
        <Col span={12}>
          Overall
        </Col>
        <Col span={12} className="rate-value">
          <Rate
            disabled
            value={roundToHalf(washroom.overall_rating)}
            allowHalf
            className="rate rate-overall"
          />
        </Col>
      </Row>
    )}
    { Object.entries(washroom.average_ratings).map(([type, value]) => (
      <React.Fragment key={type}>
        <Row>
          <Col span={12}>
            {`${ratingAsEmoji(type)} ${startCase(type)}`}
          </Col>
          <Col span={12} className="rate-value">
            <Rate
              disabled={readOnly}
              value={roundToHalf(value)}
              allowHalf
              onChange={(setValue) => {
                onChange(setValue, type);
              }}
              className={`rate rate-average rate-${kebabCase(type)}`}
            />
          </Col>
        </Row>
      </React.Fragment>
    ))}
  </>
);

WashroomRatings.propTypes = {
  washroom: PropTypes.shape({
    overall_rating: PropTypes.number.isRequired,
    average_ratings: PropTypes.shape({
      smell: PropTypes.number,
      privacy: PropTypes.number,
      cleanliness: PropTypes.number,
      toilet_paper_quality: PropTypes.number,
    }),
  }),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

WashroomRatings.defaultProps = {
  readOnly: true,
  onChange: () => {},
  washroom: {
    overall_rating: 0,
    average_ratings: {
      cleanliness: 0,
      privacy: 0,
      toilet_paper_quality: 0,
      smell: 0,
    },
  },
};

export default WashroomRatings;
