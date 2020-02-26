import React from 'react';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import Nav from '../Nav';

describe('Nav', () => {
  it('Renders the Nav page', () => {
    const component = mount(
      <Router>
        <Nav
          logout={() => {}}
        />
      </Router>,
    );
    expect(component.find('NavLink').length).toEqual(4);
    expect(component.find('NavLink').at(0).text()).toEqual('Near Me');
    expect(component.find('NavLink').at(1).text()).toEqual('Map');
    expect(component.find('NavLink').at(2).text()).toEqual('Profile');
    expect(component.find('NavLink').at(3).find('svg').length).toEqual(1);
  });
});
