import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../reviewActions';
import * as types from '../../constants/ActionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

const reviewsForUser = [
  {
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

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVE_REVIEWS event when reviews are received for a washroom', () => {
    fetchMock.getOnce(
      'https://testapi.com/washrooms/1/reviews', reviews,
    );
    const expectedActions = [
      { type: types.REQUEST_REVIEWS_FOR_WASHROOM },
      { type: types.RECEIVE_REVIEWS, status: 200, reviews },
    ];

    const store = mockStore({ reviews: [] });
    return store.dispatch(actions.getReviewsForWashroom(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_REVIEWS event when reviews are received for a user', () => {
    fetchMock.getOnce(
      'https://testapi.com/users/1/reviews', reviewsForUser,
    );
    const expectedActions = [
      { type: types.REQUEST_REVIEWS_FOR_USER },
      { type: types.RECEIVE_REVIEWS, status: 200, reviews: reviewsForUser },
    ];

    const store = mockStore({ reviews: [] });
    return store.dispatch(actions.getReviewsForUser(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_REVIEW event when a review is created', () => {
    const newReview = {
      comment: 'Nice place!',
      ratings: {
        cleanliness: 4.0,
        privacy: 4.0,
        smell: 4.0,
        toilet_paper_quality: 3.0,
      },
    };

    const response = {
      comment: 'Nice place!',
      ratings: {
        cleanliness: 4.0,
        privacy: 4.0,
        smell: 4.0,
        toilet_paper_quality: 3.0,
      },
    };

    fetchMock.postOnce('https://testapi.com/washrooms/1/reviews', response);

    const expectedActions = [
      { type: types.CREATE_REVIEW },
      { type: types.RECEIVE_REVIEW, status: 200, review: newReview },
    ];

    const store = mockStore({ reviews: [] });
    return store.dispatch(actions.createReview(1, newReview)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
