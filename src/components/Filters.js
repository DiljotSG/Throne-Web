import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Typography, Select, Slider, Switch,
} from 'antd';

import { ALL_AMENITIES } from '../constants/WashroomAmenityTypes';
import { MAX_RADIUS } from '../constants/Defaults';

import { amenityAsEmoji, amenityAsString, displayDistance } from '../utils/DisplayUtils';

import './Filters.css';

const { Text } = Typography;
const { Option } = Select;

const Filters = ({
  building,
  filter,
  filterChanged,
  locationEnabled,
  onChange,
  onSubmit,
  submitting,
}) => (
  <div className="filter">
    <Row>
      <Text strong>
        Amenities
      </Text>
      <Select
        placeholder={building ? 'Not supported for buildings yet' : 'Filter by amenity'}
        disabled={building}
        className="filter-amenity-select"
        mode="multiple"
        allowClear
        onChange={(selected) => { onChange('amenities', selected); }}
      >
        {ALL_AMENITIES.map((amenity) => (
          <Option key={amenity}>{`${amenityAsString(amenity)} ${amenityAsEmoji(amenity)}`}</Option>
        ))}
      </Select>
    </Row>
    <Row>
      <Text strong>
        Radius
      </Text>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={18}>
          <Slider
            disabled={!locationEnabled}
            min={0}
            max={MAX_RADIUS}
            step={0.5}
            onChange={(value) => { onChange('radius', value); }}
            value={typeof filter.radius === 'number' ? filter.radius : 0}
            tipFormatter={(value) => (
              locationEnabled ? displayDistance(value) : 'You must enable location to use this feature.'
            )}
          />
        </Col>
        <Col
          span={6}
          className="filter-radius-text"
        >
          <Text strong>
            {displayDistance(filter.radius)}
          </Text>
        </Col>
      </Row>
    </Row>

    {building
      && (
      <Row>
        <Switch
          checked={filter.displayEmptyBuildings}
          onChange={(value) => { onChange('displayEmptyBuildings', value, false); }}
          className="filter-switch"
        />
        <Text strong>
          Show empty buildings
        </Text>
      </Row>
      )}
    <Button
      key="submit"
      disabled={!filterChanged}
      type="primary"
      loading={submitting}
      onClick={onSubmit}
    >
      {filterChanged ? 'Apply Filters' : 'No changes to apply'}
    </Button>
  </div>
);

Filters.propTypes = {
  building: PropTypes.bool,
  filter: PropTypes.shape({
    radius: PropTypes.number,
    displayEmptyBuildings: PropTypes.bool,
  }).isRequired,
  filterChanged: PropTypes.bool,
  locationEnabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

Filters.defaultProps = {
  building: false,
  filterChanged: false,
  locationEnabled: false,
  onChange: () => {},
  onSubmit: () => {},
  submitting: false,
};

export default Filters;
