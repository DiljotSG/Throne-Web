import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import Map from '../Map';

import buildings from './data/buildings.json';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/buildings?max_results=undefined&radius=undefined&amenities=undefined', buildings);

describe('Map', () => {
  it('Renders the "Map" page', async () => {
    let component;
    await act(async () => {
      component = mount(
        <Router>
          <Map store={store} />
        </Router>,
      );
    });
    component.update();

    const map = component.find('Map');
    expect(map.prop('buildings')).toEqual(buildings);
    expect(map.find('Title').text()).toEqual('Map');
    expect(map.find('InteractiveMap').length).toEqual(1);
  });

  it('Renders "InteractiveMap" contents', async () => {
    let component;
    await act(async () => {
      component = mount(
        <Router>
          <Map store={store} />
        </Router>,
      );
    });
    component.update();

    const map = component.find('InteractiveMap').first();
    const markerList = map.prop('children')[0];
    expect(markerList.length).toBe(2);
    expect(markerList[0].props.latitude).toBe(buildings[0].location.latitude);
    expect(markerList[0].props.longitude).toBe(buildings[0].location.longitude);
    expect(markerList[1].props.latitude).toBe(buildings[1].location.latitude);
    expect(markerList[1].props.longitude).toBe(buildings[1].location.longitude);
    expect(map.prop('latitude')).toEqual(49.8080954);
    expect(map.prop('longitude')).toEqual(-97.1375209);
    expect(map.prop('zoom')).toEqual(14);
  });
});
