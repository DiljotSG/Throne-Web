import React from 'react';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import WashroomListItem from '../WashroomListItem';


const washroom = {
  id: 1,
  title: 'Washroom 1',
  gender: 'woman',
  floor: 2,
  average_rating: {
    smell: 1,
    privacy: 2,
    cleanliness: 3,
    toilet_paper_quality: 4,
  },
  amenities: ['air_dryer'],
};

describe('WashroomListItem', () => {
  it('Renders the Nav page', () => {
    const component = mount(
      <Router>
        <WashroomListItem
          item={washroom}
        />
      </Router>,
    );
    expect(component.find('NavLink').at(0).prop('href')).toBe('/washrooms/1');
    // expect(component.find('').at(0).text()).toEqual('Near Me');
    // expect(component.find('NavLink').at(1).text()).toEqual('Map');
    console.log(component);
  });
});
