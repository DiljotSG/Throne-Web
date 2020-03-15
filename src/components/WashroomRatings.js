import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Rate,
} from 'antd';
import { startCase, kebabCase } from 'lodash';
import { roundToHalf } from '../utils/NumUtils';
import { ratingAsEmoji } from '../utils/DisplayUtils';
import '../containers/WashroomDetails.css';

const WashroomRatings = ({
  overallRating, averageRatings, allowHalf, readOnly, onChange,
}) => (
  <>
    { readOnly && (
      <Row>
        <Col span={12}>
          Overall
        </Col>
        <Col span={12} className="washroom-rate-value">
          <Rate
            disabled
            value={roundToHalf(washroom.overall_rating)}
            allowHalf={allowHalf}
            className="washroom-rate washroom-rate-overall"
          />
        </Col>
      </Row>
    )}
    { Object.entries(averageRatings).map(([type, value]) => (
      <React.Fragment key={type}>
        <Row>
          <Col span={12}>
            {`${ratingAsEmoji(type)} ${startCase(type)}`}
          </Col>
          <Col span={12} className="washroom-rate-value">
            <Rate
              disabled={readOnly}
              value={roundToHalf(value)}
              allowHalf={allowHalf}
              onChange={(setValue) => {
                onChange(type, setValue);
              }}
              className={`washroom-rate washroom-rate-average washroom-rate-${kebabCase(type)}`}
            />
          </Col>
        </Row>
      </React.Fragment>
    ))}
  </>
);

WashroomRatings.propTypes = {
  overallRating: PropTypes.number,
  averageRatings: PropTypes.shape({
    smell: PropTypes.number,
    privacy: PropTypes.number,
    cleanliness: PropTypes.number,
    toilet_paper_quality: PropTypes.number,
  }),
  readOnly: PropTypes.bool,
  allowHalf: PropTypes.bool,
  onChange: PropTypes.func,
};

WashroomRatings.defaultProps = {
  readOnly: true,
  allowHalf: true,
  onChange: () => {},
  overallRating: 0,
  averageRatings: {
    cleanliness: 0,
    privacy: 0,
    toilet_paper_quality: 0,
    smell: 0,
  },
};

export default WashroomRatings;
