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

const reviews = [
  {
    comment: 'Not bad!',
    created_at: '2020-03-05T19:19:40+00:00',
    id: 1,
    ratings: {
      cleanliness: 3.0,
      privacy: 2.0,
      smell: 2.0,
      toilet_paper_quality: 2.0,
    },
    upvote_count: 0,
    user: {
      id: 2,
      profile_picture: 'default',
      username: 'polima',
    },
    washroom_id: 1,
  }, {
    comment: 'Actually, kinda bad!',
    created_at: '2020-03-05T22:18:07+00:00',
    id: 2,
    ratings: {
      cleanliness: 5.0,
      privacy: 3.0,
      smell: 4.0,
      toilet_paper_quality: 2.0,
    },
    upvote_count: 0,
    user: {
      id: 2,
      profile_picture: 'default',
      username: 'twophase',
    },
    washroom_id: 1,
  },
];

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

fetchMock.get('https://testapi.com/washrooms/1/reviews', reviews);

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
      expect(component.find('.details-gender').first().text()).toBe('🚺 Women');
      expect(component.find('.details-floor-comment').first().text()).toBe('Floor 2 | Washroom 1');
      expect(component.find('Rate').find('.rate-overall').first().prop('value')).toBe(5);
      expect(component.find('Rate').find('.rate-cleanliness').first().prop('value')).toBe(3);
      expect(component.find('Rate').find('.rate-privacy').first().prop('value')).toBe(2);
      expect(component.find('Rate').find('.rate-paper-quality').first().prop('value')).toBe(4);
      expect(component.find('Rate').find('.rate-smell').first().prop('value')).toBe(1);
      expect(component.find('li.ant-list-item').length).toBe(1);
      expect(component.find('li.ant-list-item').first().text()).toBe('Air Dryer 💨');
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

      expect(component.find('.details-title').first().text()).toBe('Science Library 👑');
      expect(component.find('.details-gender').first().text()).toBe('🚺 Women');
      expect(component.find('.details-floor-comment').first().text()).toBe('Floor 2 | Washroom 1');
      expect(component.find('Rate').find('.rate-overall').first().prop('value')).toBe(5);
      expect(component.find('Rate').find('.rate-cleanliness').first().prop('value')).toBe(3);
      expect(component.find('Rate').find('.rate-privacy').first().prop('value')).toBe(2);
      expect(component.find('Rate').find('.rate-paper-quality').first().prop('value')).toBe(4);
      expect(component.find('Rate').find('.rate-smell').first().prop('value')).toBe(1);
      expect(component.find('li.ant-list-item').length).toBe(1);
      expect(component.find('li.ant-list-item').first().text()).toBe('Air Dryer 💨');
    });
  });

  it('Lists the reviews for a washroom', async () => {
    await act(async () => {
      const match = { params: { id: '1' } };

      const component = mount(
        <WashroomDetails
          store={store}
          match={match}
          location={{}}
        />,
      );

      expect(component.find('Comment').length).toBe(2);

      const review1 = component.find('Comment').first();
      expect(review1.find('.washroom-review-comment').first().text()).toBe('Not bad!');
      expect(review1.prop('author')).toBe('polima');
      expect(review1.prop('datetime')).toBe('2020-03-05T19:19:40+00:00');

      const review2 = component.find('Comment').at(1);
      expect(review2.find('.washroom-review-comment').first().text()).toBe('Actually, kinda bad!');
      expect(review2.prop('author')).toBe('twophase');
      expect(review2.prop('datetime')).toBe('2020-03-05T22:18:07+00:00');
    });
  });
});
