import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from 'antd';

import {
  NearMe, Map, Profile, Settings,
} from './containers';
import { Nav } from './components';

import './App.css';

const { Content } = Layout;

const App = ({ store }) => (
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

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

export default App;
