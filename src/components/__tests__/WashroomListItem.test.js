import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import WashroomListItem from '../WashroomListItem';

import washroom from './data/washroom.json';

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
    expect(listItem.find('.washroom-list-item-building-title').first().text()).toBe('Science Library');
    expect(listItem.find('.washroom-list-item-comment').first().text()).toBe('Washroom 1');
    expect(listItem.find('.list-item-floor').first().text()).toBe('Floor 2');
    expect(listItem.find('.list-item-gender').first().text()).toBe('🚺');
    expect(listItem.find('.washroom-list-item-distance-value').first().text()).toBe('19 m');
    expect(listItem.find('.list-item-favorite').length).toBe(1);
  });
});
