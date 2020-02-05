import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
} from 'antd';

const { Title } = Typography;

const NearMe = (props) => {
  const { locations } = props;

  return (
    <>
      <Icon type="environment" className="icon-title" />
      <Title>Near Me</Title>
      <List
        bordered
        dataSource={locations}
        renderItem={(item) => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </>
  );
};

NearMe.propTypes = {
  locations: PropTypes.instanceOf(Array),
};

NearMe.defaultProps = {
  locations: [],
};

export default NearMe;
