import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';


import {
  Typography,
  Layout,
  Spin,
  Button,
  notification,
} from 'antd';

import Auth from './services/Auth';
import { getTerminology } from './utils/DisplayUtils';

import {
  NearMe, Map, Profile, Settings, WashroomDetails, BuildingDetails, Error,
} from './containers';
import { Nav, Login } from './components';

import './App.css';

const { Text } = Typography;
const { Content } = Layout;

const cookies = new Cookies();

function requireAuth() {
  if (!Auth.authenticated()) {
    this.setState({
      loggedIn: false,
    });
  }
}

const renderCovid19Warning = () => {
  if (cookies.get('covidNotificationDismissed')) {
    return null;
  }

  return notification.info({
    onClose: () => {
      // If a user hides the notification, keep it hidden for 8 hours (28800000ms)
      cookies.set('covidNotificationDismissed', true, { expires: new Date(Date.now() + 28800000) });
    },
    message: 'Prevent the Spread of COVID-19',
    description: (
      <>
        <>
          <Text>
            Get the latest information on COVID-19 from the Public Health Agency of Canada.
            {' '}
          </Text>
          <Text strong>
            {`Please remember to wash your hands when visiting a ${getTerminology()}.`}
          </Text>
        </>
        <Button
          className="notification-action-button"
          href="https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html"
          rel="noopener noreferrer"
          target="_blank"
          type="primary"
        >
          Go to Canada.ca
        </Button>
      </>
    ),
    duration: null,
  });
};

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

  componentDidUpdate() {
    const { loggedIn } = this.state;

    if (loggedIn) {
      renderCovid19Warning();
    }
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
          loginAddress={Auth.loginAddress().href}
          signUpAddress={Auth.signUpAddress().href}
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
                <Route path={['/', '/washrooms', '/buildings']} exact onEnter={requireAuth}>
                  <NearMe />
                </Route>
                <Route path="/map" component={Map} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/washrooms/:id" component={WashroomDetails} />
                <Route path="/buildings/:id" component={BuildingDetails} />
                <Route component={Error} />
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
