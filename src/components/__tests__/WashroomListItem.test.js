import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import WashroomListItem from '../WashroomListItem';

const washroom = {
  id: 1,
  title: 'Washroom 1',
  gender: 'women',
  floor: 2,
  average_rating: {
    smell: 1,
    privacy: 2,
    cleanliness: 3,
    toilet_paper_quality: 4,
  },
  overall_rating: 5,
  amenities: ['air_dryer'],
  is_favorite: true,
};

describe('WashroomListItem', () => {
  it('Renders List Item', () => {
    const component = mount(
      <Router>
        <WashroomListItem
          item={washroom}
        />
      </Router>,
    );

    const listItem = component.find('Row.list-item');

    expect(listItem.find('Rate').first().prop('value')).toBe(5);
    expect(listItem.find('.list-item-floor').first().text()).toEqual('Floor 2');
    expect(listItem.find('.list-item-gender').first().text()).toEqual('Women');
    expect(listItem.find('.list-item-favorite').first().text()).toEqual('👑');
    expect(listItem.find('.list-item-distance-value').first().text()).toEqual('19m');
  });
});
