import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import './Nav.css';

const { SubMenu } = Menu;
const { Header } = Layout;

// get the selected nav key
//  if pathname is /washrooms or /buildings (with ID parameter): the selected key should be '/'
//  else: selected key is the pathname
const selectedKeys = (pathname) => {
  const washroomBuildingDetails = /((washrooms)|(buildings))(\/\d+)?/;
  const firstKey = washroomBuildingDetails.test(pathname);

  return firstKey ? ['/'] : [pathname];
};

const Nav = ({ location, logout }) => (
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={selectedKeys(location.pathname)}
      className="nav-menu"
    >
      <Menu.Item key="/"><NavLink to="/">Near Me</NavLink></Menu.Item>
      <Menu.Item key="/map"><NavLink to="/map">Map</NavLink></Menu.Item>
      <SubMenu
        title="Me"
        key="/profile"
      >
        <Menu.Item key="/profile"><NavLink to="/profile">Profile</NavLink></Menu.Item>
        <Menu.Item key="/logout" onClick={logout}>Logout</Menu.Item>
      </SubMenu>
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
