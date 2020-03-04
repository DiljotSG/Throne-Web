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

    expect(component.find('NavLink').length).toEqual(1);
    expect(component.find('Rate').at(0).prop('value')).toBe(5);
    expect(component.find('div').at(0).text()).toEqual("Washroom 1Floor 2Women 👑");
    expect(component.find('div.right-side').first().text()).toEqual('Distance19m');
  });
});
