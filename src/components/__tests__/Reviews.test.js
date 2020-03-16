import React from 'react';
import { mount } from 'enzyme';
import Reviews from '../Reviews';

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

describe('Reviews', () => {
  it('Renders a list of reviews', () => {
    const component = mount(
      <Reviews
        reviews={reviews}
      />,
    );

    expect(component.find('Comment.washroom-review').length).toBe(2);

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
