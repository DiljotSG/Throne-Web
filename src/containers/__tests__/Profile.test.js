import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import Profile from '../Profile';

import user from './data/user.json';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/users', user);

describe('Profile', () => {
  it('Renders the Profile page', async () => {
    let component;
    await act(async () => {
      component = mount(
        <Router>
          <Profile store={store} />
        </Router>,
      );
    });
    component.update();
    expect(component.find('Title').text()).toEqual('twophase');
  });
});
