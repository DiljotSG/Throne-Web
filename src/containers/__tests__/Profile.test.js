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
import reviews from './data/userReviews.json';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/users', user);
fetchMock.get('https://testapi.com/users/reviews', reviews);

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

    expect(component.find('Title.username').text()).toEqual('twophase');

    expect(component.find('Comment').length).toEqual(2);
    expect(component.find('Comment').first().prop('author')).toEqual('twophase');
    expect(component.find('Comment').at(1).prop('author')).toEqual('twophase');
  });
});
