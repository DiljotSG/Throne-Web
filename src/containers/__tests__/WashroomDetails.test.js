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
  building_title: 'Science Library',
  comment: 'Washroom 1',
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
  is_favorite: true,
};

fetchMock.get('https://testapi.com/washrooms/1',
  {
    id: 1,
    building_title: 'Science Library',
    comment: 'Washroom 1',
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
    is_favorite: true,
  });

describe('WashroomDetails', () => {
  it('Displays the passed details', async () => {
    await act(async () => {
      const match = { params: { id: '1' } };
      const location = { state: { washroom } };

      const component = mount(
        <WashroomDetails
          store={store}
          match={match}
          location={location}
        />,
      );

      expect(component.find('.details-title').length).toBe(5);
      expect(component.find('.details-title').first().text()).toBe('Science Library 👑');
      expect(component.find('.details-gender').first().text()).toBe(`🚺 Women`);
      expect(component.find('.details-floor-comment').first().text()).toBe(`Floor 2 | Washroom 1`);
      expect(component.find('Rate').find('.rate-overall').first().prop('value')).toBe(5);
      expect(component.find('Rate').find('.rate-cleanliness').first().prop('value')).toBe(3);
      expect(component.find('Rate').find('.rate-privacy').first().prop('value')).toBe(2);
      expect(component.find('Rate').find('.rate-paper-quality').first().prop('value')).toBe(4);
      expect(component.find('Rate').find('.rate-smell').first().prop('value')).toBe(1);
      expect(component.find('li.ant-list-item').length).toBe(1);
      expect(component.find('li.ant-list-item').first().text()).toBe('Air Dryer');
    });
  });


  it('Fetches washroom details', async () => {
    await act(async () => {
      const match = { params: { id: '1' } };

      const component = mount(
        <WashroomDetails
          store={store}
          match={match}
          location={{}}
        />,
      );

      expect(component.find('h2').length).toEqual(1);
      expect(component.find('.details-title').first().text()).toBe('Science Library 👑');
      expect(component.find('.details-gender').first().text()).toBe(`🚺 Women`);
      expect(component.find('.details-floor-comment').first().text()).toBe(`Floor 2 | Washroom 1`);
      expect(component.find('Rate').find('.rate-overall').first().prop('value')).toBe(5);
      expect(component.find('Rate').find('.rate-cleanliness').first().prop('value')).toBe(3);
      expect(component.find('Rate').find('.rate-privacy').first().prop('value')).toBe(2);
      expect(component.find('Rate').find('.rate-paper-quality').first().prop('value')).toBe(4);
      expect(component.find('Rate').find('.rate-smell').first().prop('value')).toBe(1);
      expect(component.find('li.ant-list-item').length).toEqual(1);
      expect(component.find('li.ant-list-item').first().text()).toEqual('Air Dryer');
    });
  });
});
