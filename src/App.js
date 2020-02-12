import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Layout } from 'antd';

import { Provider } from 'react-redux'

import { NearMe, Map, Profile } from './containers';
import { Nav } from './components';

import './App.css';
import Settings from './containers/Settings';

const { Content } = Layout;

const App = ({ store }) => (
  <Provider store={store}>
    <Layout className="layout">
      <Nav />
      <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Switch>
            <Route path="/" exact>
              <NearMe/>
            </Route>
            <Route path="/map" component={Map} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </Content>
    </Layout>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App;
