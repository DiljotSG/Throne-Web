import React from 'react';
import { mount } from 'enzyme';
import WashroomRatings from '../WashroomRatings';

const defaultRatings = {
  cleanliness: 0,
  privacy: 0,
  toilet_paper_quality: 0,
  smell: 0,
};

describe('WashroomRatings', () => {
  it('Has the correct default props', () => {
    const component = mount(
      <WashroomRatings />,
    );

    expect(component.prop('overallRating')).toEqual(0);
    expect(component.prop('averageRatings')).toEqual(defaultRatings);

    expect(component.prop('readOnly')).toEqual(true);
    expect(component.find('Rate').first().prop('disabled')).toBe(true);

    expect(component.find('Rate.rate-overall').first().prop('value')).toBe(0);
    expect(component.find('Rate.rate-cleanliness').first().prop('value')).toBe(0);
    expect(component.find('Rate.rate-privacy').first().prop('value')).toBe(0);
    expect(component.find('Rate.rate-toilet-paper-quality').first().prop('value')).toBe(0);
    expect(component.find('Rate.rate-smell').first().prop('value')).toBe(0);
  });

  it('Renders the correct ratings', () => {
    const component = mount(
      <WashroomRatings
        readOnly={false}
        overallRating={4}
        averageRatings={{
          cleanliness: 1,
          privacy: 2,
          toilet_paper_quality: 3,
          smell: 4,
        }}
      />,
    );

    expect(component.prop('readOnly')).toEqual(false);
    expect(component.find('Rate').first().prop('disabled')).toBe(false);

    expect(component.find('Rate.rate-overall').length).toBe(0);
    expect(component.find('Rate.rate-cleanliness').first().prop('value')).toBe(1);
    expect(component.find('Rate.rate-privacy').first().prop('value')).toBe(2);
    expect(component.find('Rate.rate-toilet-paper-quality').first().prop('value')).toBe(3);
    expect(component.find('Rate.rate-smell').first().prop('value')).toBe(4);
  });
});
