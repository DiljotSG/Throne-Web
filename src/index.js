import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import configureStore from './store';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Router>
    <App store={store}/>
  </Router>,
  document.getElementById('root')
);
