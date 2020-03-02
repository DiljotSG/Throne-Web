import React from 'react';
import PropTypes from 'prop-types';

import { List, Rate } from 'antd';

const NearMeList = ({ data, fetching }) => (
  <List
    className="near-me-list"
    loading={fetching}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item className="near-me-list-item">
        {item.title}
        <br />
        <Rate
          disabled
          allowHalf
          value={item.overall_rating}
        />
      </List.Item>
    )}
  />
);

NearMeList.propTypes = {
  data: PropTypes.instanceOf(Array),
  fetching: PropTypes.bool,
};

NearMeList.defaultProps = {
  data: [],
  fetching: false,
};

export default NearMeList;
