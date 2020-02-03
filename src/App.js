import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { NearMe, Map, Profile } from './pages';
import { Nav } from './components';

import './App.css';

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
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <NearMe
              locations={locations}
            />
          </Route>
          <Route path="/map" component={Map} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
