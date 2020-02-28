import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Button } from 'antd';

const { Content } = Layout;

const Login = ({ auth }) => (
  <Layout className="layout">
    <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
      <h1>You must login to see this page.</h1>
      <Button href={auth.loginAddress()}>
        Log in
      </Button>
      <Button href={auth.signUpAddress()}>
        Sign up
      </Button>
    </Content>
  </Layout>
);

Login.propTypes = {
  auth: PropTypes.func.isRequired,
};

export default Login;
