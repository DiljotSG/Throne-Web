import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

import BuildingDetails from '../BuildingDetails';

import buildings from './data/buildings.json';
import washrooms from './data/washrooms.json';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/buildings/1', buildings[0]);
fetchMock.get('https://testapi.com/buildings/1/washrooms', washrooms);

describe('BuildingDetails', () => {
  it('Fetches building details', async () => {
    let component;

    await act(async () => {
      const match = { params: { id: '1' } };

      component = mount(
        <Router>
          <BuildingDetails
            store={store}
            match={match}
            location={{}}
          />
        </Router>,
      );
    });

    component.update();

    // Test Building details
    expect(component.find('.details-title').first().text()).toBe('Wallace Building');
    expect(component.find('.building-rate-overall').first().prop('value')).toBe(3);
    expect(component.find('.washroom-list-header').first().text()).toBe('Washrooms Inside');

    // Test building's washrooms list
    expect(component.find('.washroom-list-item-building-title').first().text()).toBe('Washroom 1');
    expect(component.find('.list-item-gender').first().text()).toBe('🚺');
    expect(component.find('.list-item-floor').first().text()).toBe('Floor 2');
    expect(component.find('.washroom-list-item-rating').first().prop('value')).toBe(5);
    expect(component.find('.washroom-list-item-distance-value').first().text()).toBe('19 m');
  });
});
