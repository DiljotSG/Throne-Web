import React from 'react';
import { shallow } from 'enzyme';

import Profile from './Profile';

describe('Profile', () => {
  it('Renders the Profile page', () => {
    const component = shallow(<Profile />);

    expect(component.text()).toEqual('Profile');
  });
});
