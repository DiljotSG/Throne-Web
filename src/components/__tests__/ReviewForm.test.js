import React from 'react';
import { mount } from 'enzyme';
import ReviewForm from '../ReviewForm';

import review from './data/review.json';

describe('ReviewForm', () => {
  it('Sets the correct default props', () => {
    const component = mount(
      <ReviewForm
        review={review}
      />,
    );

    expect(component.prop('submitting')).toBe(false);
    expect(component.prop('errors')).toStrictEqual([]);
    expect(component.prop('created')).toBe(false);
    expect(component.prop('attemptedSubmit')).toBe(false);
  });

  it('Doesn\'t display errors if no submit has been attempted', () => {
    const component = mount(
      <ReviewForm
        review={review}
        errors={["I'm an error!"]}
      />,
    );

    expect(component.prop('errors')).toStrictEqual(["I'm an error!"]);
    expect(component.find('Alert').length).toBe(0);
  });

  it('Displays errors if they exist and a submit has been attempted', () => {
    const component = mount(
      <ReviewForm
        review={review}
        errors={["I'm an error!"]}
        attemptedSubmit
      />,
    );

    expect(component.prop('errors')).toStrictEqual(["I'm an error!"]);
    expect(component.find('Alert').length).toBe(1);
    expect(component.find('Alert').text()).toBe("I'm an error!");
  });

  it('Displays success message if review was created', () => {
    const component = mount(
      <ReviewForm
        review={review}
        created
      />,
    );

    expect(component.find('Alert').length).toBe(1);
    expect(component.find('Alert').text()).toBe('Submitted review');
  });
});
