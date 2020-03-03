import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

import WashroomDetails from '../WashroomDetails';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/washrooms/1', [
  {
    title: 'Washroom 1',
    gender: 'woman',
    floor: 2,
    average_rating: {
      smell: 1,
      privacy: 2,
      cleanliness: 3,
      toilet_paper_quality: 4,
    },
    amenities: ['air_dryer'],

  },
]);

describe('WashroomDetails', () => {
  it('Renders the "WashroomDetails" page', async () => {
    await act(async () => {
      const component = mount(<WashroomDetails store={store} />);

      expect(component.find('Title').text()).toEqual('Washroom 1');
    });
  });


  it('Displays washroom details', async () => {
    await act(async () => {
      const component = mount(<WashroomDetails store={store} />);
      expect(component.find('h3').first().text()).toEqual("Floor 2 | Women's");
      expect(component.find('li')).toHaveLength(1);
      expect(component.find('li').first().text()).toEqual('Air Dryer');
    });
  });
});
