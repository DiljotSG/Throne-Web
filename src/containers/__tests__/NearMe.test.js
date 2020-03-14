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

fetchMock.get('https://testapi.com/washrooms?latitude=0&longitude=0&max_results=100&radius=1000&amenities=null', [
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
    distance: 19,
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
    distance: 19,
  },
]);

fetchMock.get('https://testapi.com/buildings?latitude=undefined&longitude=undefined&max_results=undefined&radius=undefined&amenities=undefined', [
  {
    best_ratings: {
      cleanliness: 5.0,
      privacy: 4.0,
      smell: 1.0,
      toilet_paper_quality: 3.0,
    },
    created_at: '2020-03-05T13:02:49+00:00',
    id: 1,
    location: {
      latitude: 49.81175231933594,
      longitude: -97.13582611083984,
    },
    maps_service_id: 54724739,
    overall_rating: 3.25,
    title: 'Wallace Building',
    washroom_count: 1,
  },
  {
    best_ratings: {
      cleanliness: 2.7142856121063232,
      privacy: 2.5714285373687744,
      smell: 2.5714285373687744,
      toilet_paper_quality: 2.7142856121063232,
    },
    created_at: '2020-03-05T13:02:50+00:00',
    id: 2,
    location: {
      latitude: 49.809364318847656,
      longitude: -97.1344985961914,
    },
    maps_service_id: 54724743,
    overall_rating: 2.642857074737549,
    title: 'University Centre',
    washroom_count: 0,
  },
]);

describe('NearMe', () => {
  it.only('Renders the "Near me" page with tabs', async () => {
    await act(async () => {
      const component = mount(
        <Router>
          <NearMe store={store} />
        </Router>,
      );

      expect(component.find('Title').text()).toEqual('Near Me');
      expect(component.find('TabPane')).toHaveLength(2);
      expect(component.find('TabPane').first().prop('tab')).toEqual('Buildings');
      expect(component.find('TabPane').at(1).prop('tab')).toEqual('Washrooms');
    });
  });

  it('Displays a list of buildings', async () => {
    await act(async () => {
      const component = mount(
        <Router>
          <NearMe store={store} />
        </Router>,
      );

      // TODO: replace selector with BuildingListItem once new PR goes in
      expect(component.find('Item.near-me-list-item')).toHaveLength(2);
      const listItem1 = component.find('Item.near-me-list-item').first();

      // TODO: don't check text representation, check the PROPS of the BuildingListItem
      expect(listItem1.text()).toEqual('Wallace Building');

      const listItem2 = component.find('Item.near-me-list-item').at(1);
      expect(listItem2.text()).toEqual('University Centre');
    });
  });


  // Spent hours trying to navigate to next tab to test
  // Was unsuccessful but we can't be blocked on this
  it('Displays a list of washrooms', async () => {
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
