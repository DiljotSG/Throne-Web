import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout, Spin, Button } from 'antd';

import Auth from './services/Auth';

import {
  NearMe, Map, Profile, Settings,
} from './containers';
import { Nav } from './components';

import './App.css';

const { Content } = Layout;

function requireAuth() {
  if (!Auth.authenticated()) {
    this.setState({
      loggedIn: false,
    });
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: Auth.authenticated(),
      authenticating: true,
    };
  }

  componentDidMount() {
    Auth.attemptLogin().then((loggedIn) => {
      this.setState({
        authenticating: false,
        loggedIn,
      });
    });
  }

  logout() {
    Auth.logout();

    this.setState({
      loggedIn: false,
    });
  }

  render() {
    const { store } = this.props;
    const { authenticating, loggedIn } = this.state;

    if (authenticating) {
      return (
        <Layout className="layout">
          <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
            <Spin />
          </Content>
        </Layout>
      );
    }

    if (!loggedIn) {
      return (
        <Layout className="layout">
          <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
            <h1>You must login to see this page.</h1>
            <Button href={Auth.loginAddress()}>
              Log in
            </Button>
            <Button href={Auth.signUpAddress()}>
              Sign up
            </Button>
          </Content>
        </Layout>
      );
    }

    return (
      <Provider store={store}>
        <Layout className="layout">
          <Nav logout={() => this.logout()} />
          <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
            <Button onClick={Auth.refreshLogin}>Refresh login</Button>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Switch>
                <Route path="/" exact onEnter={requireAuth}>
                  <NearMe />
                </Route>
                <Route path="/map" component={Map} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

if('REACT_APP_MAPBOX_TOKEN' in process.env) {
  console.log("It worked!")
}

export default App;
