import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import NearMe from '../NearMe';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/washrooms', [
  {
    id: 1,
    title: 'Washroom 1',
    gender: 'men',
    floor: 2,
    average_rating: {
      smell: 1,
      privacy: 2,
      cleanliness: 3,
      toilet_paper_quality: 4,
    },
    overall_rating: 5,
    amenities: ['air_dryer'],
    is_favorite: true,
  }, {
    id: 2,
    title: 'Washroom 2',
    gender: 'women',
    floor: 1,
    average_rating: {
      smell: 1,
      privacy: 2,
      cleanliness: 3,
      toilet_paper_quality: 4,
    },
    overall_rating: 5,
    amenities: ['air_dryer'],
    is_favorite: false,
  },
]);

describe('NearMe', () => {
  it('Renders the "Near me" page', async () => {
    await act(async () => {
      const component = mount(<Router><NearMe store={store} /></Router>);

      expect(component.find('Title').text()).toEqual('Near Me');
    });
  });


  it('Displays a list of locations', async () => {
    await act(async () => {
      const component = mount(<Router><NearMe store={store} /></Router>);
      expect(component.find('li.near-me-list-item')).toHaveLength(2);
      expect(component.find('li.near-me-list-item').first().text()).toBe('Washroom 1');
      expect(component.find('li.near-me-list-item').at(1).text()).toBe('Washroom 2');
    });
  });
});
