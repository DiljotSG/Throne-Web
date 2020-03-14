import reviewReducer from '../reviewReducer';
import * as actions from '../../constants/ActionTypes';

const review1 = {
  comment: 'Not bad!',
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
    username: 'twophase',
  },
  washroom_id: 1,
};

const review2 = {
  comment: 'Not bad!',
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
    username: 'twophase',
  },
  washroom_id: 1,
};

describe('review reducer', () => {
  it('should return the initial state', () => {
    expect(reviewReducer(undefined, {})).toEqual(
      {
        reviews: [],
      },
    );
  });

  it('should handle RECEIVE_REVIEWS', () => {
    expect(
      reviewReducer([], {
        type: actions.RECEIVE_REVIEWS,
        reviews: [review1, review2],
        status: 200,
      }),
    ).toEqual(
      {
        reviews: [review1, review2],
        isFetching: false,
        status: 200,
      },
    );
  });

  it('should handle REQUEST_REVIEWS_FOR_WASHROOM', () => {
    expect(
      reviewReducer([], {
        type: actions.REQUEST_REVIEWS_FOR_WASHROOM,
      }),
    ).toEqual(
      {
        isFetching: true,
      },
    );
  });

  it('should handle REQUEST_REVIEWS_FOR_USER', () => {
    expect(
      reviewReducer([], {
        type: actions.REQUEST_REVIEWS_FOR_USER,
      }),
    ).toEqual(
      {
        isFetching: true,
      },
    );
  });

  it('should handle FAILURE', () => {
    expect(
      reviewReducer([], {
        type: actions.FAILURE,
        status: 401,
      }),
    ).toEqual(
      {
        isFetching: false,
        status: 401,
      },
    );
  });
});
