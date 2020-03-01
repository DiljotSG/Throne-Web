import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';

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
    title: 'Washroom 1',
  }, {
    title: 'Washroom 2',
  },
]);

describe('NearMe', () => {
  it('Renders the "Near me" page', async () => {
    await act(async () => {
      const component = mount(<NearMe store={store} />);

      expect(component.find('Title').text()).toEqual('Near Me');
    });
  });


  it('Displays a list of locations', async () => {
    await act(async () => {
      const component = mount(<NearMe store={store} />);
      expect(component.find('li.near-me-list-item')).toHaveLength(2);
      expect(component.find('li.near-me-list-item').first().text()).toEqual('Washroom 1');
      expect(component.find('li.near-me-list-item').at(1).text()).toEqual('Washroom 2');
    });
  });
});
