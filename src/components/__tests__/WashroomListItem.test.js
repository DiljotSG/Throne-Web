import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import WashroomListItem from '../WashroomListItem';
import { genderAsEmoji } from '../../utils/DisplayUtils';

const washroom = {
  id: 1,
  building_title: 'Science Library',
  comment: 'Washroom 1',
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

    const listItem = component.find('Row');

    expect(listItem.find('Rate').first().prop('value')).toBe(5);
    expect(listItem.find('.list-item-building-title').first().text()).toBe('Science Library');
    expect(listItem.find('.list-item-comment').first().text()).toBe('Washroom 1');
    expect(listItem.find('.list-item-floor').first().text()).toBe('Floor 2');
    expect(listItem.find('.list-item-gender').first().text()).toBe('🚺');
    expect(listItem.find('.list-item-favorite').first().text()).toBe('👑');
    expect(listItem.find('.list-item-distance-value').first().text()).toBe('19m');
  });
});
