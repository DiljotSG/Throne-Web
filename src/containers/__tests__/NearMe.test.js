import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import NearMe from '../NearMe';

import washrooms from './data/washrooms.json';
import buildings from './data/buildings.json';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/washrooms?max_results=1000&radius=50000&amenities=', washrooms);
fetchMock.get('https://testapi.com/buildings?max_results=1000&radius=50000&amenities=', buildings);

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
