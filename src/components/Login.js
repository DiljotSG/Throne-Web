import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Button } from 'antd';

import './Login.css';

const { Content } = Layout;

const Login = ({ auth }) => (
  <Layout className="layout">
    <div className="app-background">
      <Content className="login-container" style={{ minHeight: '100vh' }}>
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
            href={auth.loginAddress()}
          >
            Login
          </Button>
          <Button
            className="login-button"
            block
            size="large"
            shape="round"
            href={auth.signUpAddress()}
          >
            Sign Up
          </Button>
        </div>
      </Content>
    </div>
  </Layout>
);

Login.propTypes = {
  auth: PropTypes.func.isRequired,
};

export default Login;
