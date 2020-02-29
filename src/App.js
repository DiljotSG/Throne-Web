import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout, Spin } from 'antd';

import Auth from './services/Auth';

import {
  NearMe, Map, Profile, Settings, WashroomDetails,
} from './containers';
import { Nav, Login } from './components';

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
          <Content className="app-content">
            <Spin />
          </Content>
        </Layout>
      );
    }

    if (!loggedIn) {
      return (
        <Login
          loginAddress={Auth.loginAddress()}
          signUpAddress={Auth.signUpAddress()}
        />
      );
    }

    return (
      <Provider store={store}>
        <Layout className="layout">
          <Nav logout={() => this.logout()} />
          <Content className="app-content">
            <div className="app-switch-container">
              <Switch>
                <Route path="/" exact onEnter={requireAuth}>
                  <NearMe />
                </Route>
                <Route path="/map" component={Map} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/washrooms/:id" component={WashroomDetails} />
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

export default App;
