import React from 'react';
import { mount } from 'enzyme';

import StarRating from '../StarRating';

describe('StarRating', () => {
  it('Renders a component with default values', () => {
    const component = mount(
      <StarRating />,
    );

    expect(component.find('StarRating'));
    expect(component.find('Icon').length).toEqual(5);
    expect(component.find('Icon').at(0).hasClass('star-empty')).toEqual(true);
    expect(component.find('Icon').at(1).hasClass('star-empty')).toEqual(true);
    expect(component.find('Icon').at(2).hasClass('star-empty')).toEqual(true);
    expect(component.find('Icon').at(3).hasClass('star-empty')).toEqual(true);
    expect(component.find('Icon').at(4).hasClass('star-empty')).toEqual(true);
  });

  it('Renders the correct number of filled stars', () => {
    const component = mount(
      <StarRating
        rating={3}
      />,
    );

    expect(component.find('StarRating'));
    expect(component.find('Icon').length).toEqual(5);
    expect(component.find('Icon').at(0).hasClass('star-filled')).toEqual(true);
    expect(component.find('Icon').at(1).hasClass('star-filled')).toEqual(true);
    expect(component.find('Icon').at(2).hasClass('star-filled')).toEqual(true);
    expect(component.find('Icon').at(3).hasClass('star-empty')).toEqual(true);
    expect(component.find('Icon').at(4).hasClass('star-empty')).toEqual(true);
  });

  it('Renders a custom number of stars', () => {
    const component = mount(
      <StarRating
        rating={1}
        total={3}
      />,
    );

    expect(component.find('StarRating'));
    expect(component.find('Icon').length).toEqual(3);
    expect(component.find('Icon').at(0).hasClass('star-filled')).toEqual(true);
    expect(component.find('Icon').at(1).hasClass('star-empty')).toEqual(true);
    expect(component.find('Icon').at(2).hasClass('star-empty')).toEqual(true);
  });
});
