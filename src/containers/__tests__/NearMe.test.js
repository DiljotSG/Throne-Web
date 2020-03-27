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

fetchMock.get('https://testapi.com/washrooms?max_results=1000&radius=30&amenities=', washrooms);
fetchMock.get('https://testapi.com/buildings?max_results=1000&radius=30&amenities=', buildings);

describe('NearMe', () => {
  it('Renders the "Near me" page with tabs', async () => {
    let component;
    await act(async () => {
      component = mount(
        <Router>
          <NearMe store={store} />
        </Router>,
      );
    });

    expect(component.find('Title').first().text()).toEqual('Near Me');
    expect(component.find('TabPane')).toHaveLength(2);
    expect(component.find('TabPane').first().prop('tab')).toEqual('Buildings');
    expect(component.find('TabPane').at(1).prop('tab')).toEqual('Washrooms');
  });

  it('Displays a list of buildings', async () => {
    let component;
    await act(async () => {
      component = mount(
        <Router>
          <NearMe store={store} />
        </Router>,
      );
    });

    expect(component.find('Item.near-me-list-item')).toHaveLength(1);

    const listItem1 = component.find('Item.near-me-list-item').first();
    expect(listItem1.find('.building-list-item-building-title').first().text()).toEqual('Wallace Building');
    expect(listItem1.find('.building-list-item-washroom-count').first().text()).toEqual('Washrooms: 1');
    expect(listItem1.find('Rate.building-list-item-rating').first().prop('value')).toEqual(3);
  });
});
