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
    comment: 'Washroom 1',
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
    comment: 'Washroom 2',
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
      const component = mount(
        <Router>
          <NearMe store={store} />
        </Router>,
      );

      expect(component.find('Title').text()).toEqual('Near Me');
    });
  });


  it('Displays a list of locations', async () => {
    await act(async () => {
      const component = mount(
        <Router>
          <NearMe store={store} />
        </Router>,
      );

      expect(component.find('WashroomListItem')).toHaveLength(2);

      const listItem1 = component.find('WashroomListItem').first();

      expect(listItem1.prop('item').comment).toEqual('Washroom 1');
      expect(listItem1.find('.list-item-comment').first().text()).toEqual('Washroom 1');
      expect(listItem1.find('.list-item-floor').first().text()).toEqual('Floor 2');
      expect(listItem1.find('.list-item-gender').first().text()).toEqual('Men');

      const listItem2 = component.find('WashroomListItem').at(1);

      expect(listItem2.prop('item').comment).toEqual('Washroom 2');
      expect(listItem2.find('.list-item-comment').first().text()).toEqual('Washroom 2');
      expect(listItem2.find('.list-item-floor').first().text()).toEqual('Floor 1');
      expect(listItem2.find('.list-item-gender').first().text()).toEqual('Women');
    });
  });
});
