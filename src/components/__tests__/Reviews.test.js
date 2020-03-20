import React from 'react';
import { mount } from 'enzyme';
import Reviews from '../Reviews';

import reviews from './data/reviews.json';

Date.now = jest.fn(() => new Date(Date.UTC(2020, 2, 6)).valueOf());

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
    expect(review1.prop('datetime')).toBe('5 hours ago');

    const review2 = component.find('Comment').at(1);
    expect(review2.find('.washroom-review-comment').first().text()).toBe('Actually, kinda bad!');
    expect(review2.prop('author')).toBe('twophase');
    expect(review2.prop('datetime')).toBe('2 hours ago');
  });
});
