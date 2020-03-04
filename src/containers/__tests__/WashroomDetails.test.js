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

const washroom = {
  id: 1,
  title: 'Washroom 1',
  gender: 'women',
  floor: 2,
  overall_rating: 5,
  average_ratings: {
    smell: 1,
    privacy: 2,
    cleanliness: 3,
    toilet_paper_quality: 4,
  },
  amenities: ['air_dryer'],
  is_favorite: false,
};

fetchMock.get('https://testapi.com/washrooms/1',
  {
    id: 1,
    title: 'Washroom 1',
    gender: 'women',
    floor: 2,
    overall_rating: 5,
    average_ratings: {
      smell: 1,
      privacy: 2,
      cleanliness: 3,
      toilet_paper_quality: 4,
    },
    amenities: ['air_dryer'],
    is_favorite: false,
  });

describe('WashroomDetails', () => {
  it('Displays the passed details', async () => {
    await act(async () => {
      const match = { params: { id: 1 } };
      const location = { state: { washroom } };
      const component = mount(<WashroomDetails store={store} match={match} location={location} />);

      expect(component.find('h2').length).toEqual(1);
      expect(component.find('Rate').at(0).prop('defaultValue')).toBe(5);
      expect(component.find('Rate').at(2).prop('defaultValue')).toBe(3);
      expect(component.find('Rate').at(4).prop('defaultValue')).toBe(2);
      expect(component.find('Rate').at(6).prop('defaultValue')).toBe(4);
      expect(component.find('Rate').at(8).prop('defaultValue')).toBe(1);
      expect(component.find('h3').text()).toEqual("Floor 2 | Women's");
      expect(component.find('li.ant-list-item').length).toEqual(1);
      expect(component.find('li.ant-list-item').first().text()).toEqual('Air Dryer');
    });
  });


  it('Fetches washroom details', async () => {
    await act(async () => {
      const match = { params: { id: 1 } };
      const component = mount(<WashroomDetails store={store} match={match} location={{}} />);
      expect(component.find('h2').length).toEqual(1);
      expect(component.find('Rate').at(0).prop('defaultValue')).toBe(5);
      expect(component.find('Rate').at(2).prop('defaultValue')).toBe(3);
      expect(component.find('Rate').at(4).prop('defaultValue')).toBe(2);
      expect(component.find('Rate').at(6).prop('defaultValue')).toBe(4);
      expect(component.find('Rate').at(8).prop('defaultValue')).toBe(1);
      expect(component.find('h3').text()).toEqual("Floor 2 | Women's");
      expect(component.find('li.ant-list-item').length).toEqual(1);
      expect(component.find('li.ant-list-item').first().text()).toEqual('Air Dryer');
    });
  });
});
