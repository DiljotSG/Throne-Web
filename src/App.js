import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { NearMe, Map, Profile } from './pages';
import { Nav } from './components';

import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={NearMe} />
        <Route path="/map" component={Map} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
