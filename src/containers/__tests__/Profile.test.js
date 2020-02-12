import React from 'react';
import { mount } from 'enzyme';

import Profile from '../Profile';

describe('Profile', () => {
  it('Renders the Profile page', () => {
    const component = mount(<Profile />);

    expect(component.find('Title').text()).toEqual('User Name');
  });
});
