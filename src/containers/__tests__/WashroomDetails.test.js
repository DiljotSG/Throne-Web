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

const addedReview = {
  comment: 'I hate this place',
  created_at: '2020-03-08T19:19:40+00:00',
  id: 1,
  ratings: {
    cleanliness: 1.0,
    privacy: 1.0,
    smell: 1.0,
    toilet_paper_quality: 1.0,
  },
  upvote_count: 0,
  user: {
    id: 2,
    profile_picture: 'default',
    username: 'diljot',
  },
  washroom_id: 1,
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
    location: {
      latitude: 49.8080954,
      longitude: -97.1375209,
    },
  });

fetchMock.get('https://testapi.com/washrooms/1/reviews', reviews);

fetchMock.post('https://testapi.com/washrooms/1/reviews', addedReview);

Date.now = jest.fn(() => new Date(Date.UTC(2020, 2, 9)).valueOf());

describe('WashroomDetails', () => {
  it('Fetches washroom details', async () => {
    let component;

    await act(async () => {
      const match = { params: { id: '1' } };

      component = mount(
        <WashroomDetails
          store={store}
          match={match}
          location={{}}
        />,
      );
    });

    component.update();

    expect(component.find('.details-title').first().text()).toBe('Science Library');
    expect(component.find('.details-gender').first().text()).toBe('🚺 Women');
    expect(component.find('.details-floor-comment').first().text()).toBe('Floor 2 | Washroom 1');
    expect(component.find('Rate').find('.washroom-rate-overall').first().prop('value')).toBe(5);
    expect(component.find('Rate').find('.washroom-rate-cleanliness').first().prop('value')).toBe(3);
    expect(component.find('Rate').find('.washroom-rate-privacy').first().prop('value')).toBe(2);
    expect(component.find('Rate').find('.washroom-rate-toilet-paper-quality').first().prop('value')).toBe(4);
    expect(component.find('Rate').find('.washroom-rate-smell').first().prop('value')).toBe(1);
    expect(component.find('li.ant-list-item').length).toBe(1);
    expect(component.find('li.ant-list-item').first().text()).toBe('Air Dryer 💨');
    expect(component.find('InteractiveMap').first().prop('latitude')).toBe(49.8080954);
    expect(component.find('InteractiveMap').first().prop('longitude')).toBe(-97.1375209);
  });

  it('Lists the reviews for a washroom', async () => {
    let component;

    await act(async () => {
      const match = { params: { id: '1' } };

      component = mount(
        <WashroomDetails
          store={store}
          match={match}
          location={{}}
        />,
      );
    });

    component.update();

    expect(component.find('Comment.washroom-review').length).toBe(2);

    const review1 = component.find('Comment.washroom-review').first();
    expect(review1.find('.washroom-review-comment').first().text()).toBe('Actually, kinda bad!');
    expect(review1.prop('author')).toBe('twophase');
    expect(review1.prop('datetime')).toBe('3 days ago');
    const review2 = component.find('Comment.washroom-review').at(1);
    expect(review2.find('.washroom-review-comment').first().text()).toBe('Not bad!');
    expect(review2.prop('author')).toBe('polima');
    expect(review2.prop('datetime')).toBe('3 days ago');
  });

  it('Creates a new review', async () => {
    let component;

    const ratings = {
      cleanliness: 1.0,
      privacy: 1.0,
      smell: 1.0,
      toilet_paper_quality: 1.0,
    };

    await act(async () => {
      const match = { params: { id: '1' } };

      component = mount(
        <WashroomDetails
          store={store}
          match={match}
          location={{}}
        />,
      );
    });
    component.update();

    expect(component.find('Comment.review-form-comment').length).toBe(1);
    expect(component.find('Comment.washroom-review').length).toBe(2);

    // Set ratings
    component.find('WashroomDetails').setState({ review: { ratings } });

    // Leave a comment
    const commentEvent = { target: { value: 'I love this washroom!' } };
    component.find('TextArea').simulate('change', commentEvent);
    expect(component.find('TextArea').prop('value')).toBe('I love this washroom!');

    // Submit create
    await act(async () => {
      await component.find('Button.review-form-submit button').simulate('click');
    });
    component.update();

    // Assert new review was created, and is located at the top of the list
    expect(component.find('Comment.washroom-review').length).toBe(3);

    const newReview = component.find('Comment.washroom-review').at(0);
    expect(newReview.find('.washroom-review-comment').first().text()).toBe('I hate this place');
    expect(newReview.prop('author')).toBe('diljot');
    expect(newReview.prop('datetime')).toBe('5 hours ago');
  });
});
