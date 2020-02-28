import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Button } from 'antd';

import './Login.css';

const { Content } = Layout;

const Login = ({ auth }) => (
  <Layout className="layout">
    <div className="login-background">
      <Content style={{ padding: '15% 0 0 0', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', fontSize: '40pt', color: 'white' }}>
          Welcome to Throne
        </h1>
        <div style={{ paddingLeft: '46.5%', paddingRight: '50%' }}>
          <Button type="primary" style={{ margin: '10px 10px 5px 17px' }} href={auth.loginAddress()}>
            Login
          </Button>
          <Button style={{ margin: '5px 10px 10px 10px' }} href={auth.signUpAddress()}>
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
