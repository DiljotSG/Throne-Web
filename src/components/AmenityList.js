import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, List,
} from 'antd';

import { amenityAsString, amenityAsEmoji } from '../utils/DisplayUtils';

const AmenityList = ({ amenities }) => (
  <Card>
    <List
      header={<b>Amenities</b>}
      size="small"
      dataSource={amenities}
      renderItem={(item) => (
        <List.Item key={item}>
          {amenityAsString(String(item))}
          {' '}
          {amenityAsEmoji(String(item))}
        </List.Item>
      )}
    />
  </Card>
);

AmenityList.propTypes = {
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AmenityList;
