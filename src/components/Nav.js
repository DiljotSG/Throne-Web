import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import './Nav.css';

const { Header } = Layout;

const Nav = ({ location, logout }) => (
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
      style={{ lineHeight: '64px' }}
      // className="nav-menu"
    >
      <Menu.Item key="/"><NavLink to="/">Near Me</NavLink></Menu.Item>
      <Menu.Item key="/map"><NavLink to="/map">Map</NavLink></Menu.Item>
      <Menu.Item key="/profile"><NavLink to="/profile">Profile</NavLink></Menu.Item>
      <Menu.Item key="/settings"><NavLink to="/settings"><Icon type="setting" /></NavLink></Menu.Item>
      <Menu.Item key="/logout" onClick={logout}>Logout</Menu.Item>
    </Menu>
  </Header>
);

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Nav);
