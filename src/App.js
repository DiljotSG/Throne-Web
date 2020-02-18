import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import { Layout, Spin } from 'antd';
import Auth from './services/Auth';

import {
  NearMe, Map, Profile, Settings,
} from './containers';
import { Nav } from './components';

import './App.css';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: Auth.authenticated(),
    };
  }

  componentDidMount() {
    Auth.attemptLogin().then((loggedIn) => {
      this.setState({ loggedIn });
    });
  }

  render() {
    const { store } = this.props;
    const { loggedIn } = this.state;

    if (!loggedIn) {
      return (
        <Layout className="layout">
          <h1>Logging you in...</h1>
          <Spin />
        </Layout>
      );
    }

    return (
      <Provider store={store}>
        <Layout className="layout">
          <Nav />
          <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Switch>
                <Route path="/" exact>
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

export default App;
