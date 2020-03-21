import React from 'react';
import { mount } from 'enzyme';
import AmenityList from '../AmenityList';

import amenities from './data/amenities.json';

describe('Amenities', () => {
  it('Renders empty when no amenities are passed', () => {
    const component = mount(
      <AmenityList
        amenities={[]}
      />,
    );

    expect(component.find('Empty').length).toBe(1);
  });

  it('Renders a list of amenities', () => {
    const component = mount(
      <AmenityList
        amenities={amenities}
      />,
    );

    expect(component.find('Item.amenity-list-item').length).toBe(2);
    expect(component.find('Item.list-item-bidet').text()).toBe('Bidet 💦');
    expect(component.find('Item.list-item-garbage-can').text()).toBe('Garbage Can 🗑');
  });
});
