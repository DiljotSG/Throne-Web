import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Layout } from 'antd';

import { NearMe, Map, Profile } from './pages';
import { Nav } from './components';

import './App.css';
import Settings from './pages/Settings';

const { Content } = Layout;

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL)
      .then((response) => response.json())
      .then((data) => this.setState({ locations: data }));
  }

  render() {
    const { locations } = this.state;

    return (
      <Layout className="layout">
        <Router>
          <Nav />
          <Content style={{ padding: '30px 50px', minHeight: '100vh' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Switch>
                <Route path="/" exact>
                  <NearMe
                    locations={locations}
                  />
                </Route>
                <Route path="/map" component={Map} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </div>
          </Content>
        </Router>
      </Layout>
    );
  }
}

export default App;
