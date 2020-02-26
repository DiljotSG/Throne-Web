import React from 'react';
import { Typography, Icon } from 'antd';

const { Title } = Typography;

const Profile = () => (
  <>
    <Icon type="user" className="icon-title" />
    <Title>User Name</Title>
  </>
);

export default Profile;
