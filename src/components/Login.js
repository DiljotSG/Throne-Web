import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Button } from 'antd';

import './Login.css';

const { Content } = Layout;

const Login = ({ loginAddress, signUpAddress }) => (
  <Layout className="layout">
    <div className="app-background">
      <Content className="login-container">
        <h1 className="login-title">
          Welcome to Throne
        </h1>
        <div className="login-buttons-container">
          <Button
            className="login-button"
            block
            size="large"
            shape="round"
            type="primary"
            href={loginAddress}
          >
            Login
          </Button>
          <Button
            className="login-button"
            block
            size="large"
            shape="round"
            href={signUpAddress}
          >
            Sign Up
          </Button>
        </div>
      </Content>
    </div>
  </Layout>
);

Login.propTypes = {
  loginAddress: PropTypes.string.isRequired,
  signUpAddress: PropTypes.string.isRequired,
};

export default Login;
