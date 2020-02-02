import React from 'react';
import { shallow } from 'enzyme';

import Nav from './Nav';

describe('Nav', () => {
  it('Renders the Nav page', () => {
    const component = shallow(<Nav />);

    expect(component.find('li').length).toEqual(3);
    expect(component.find('li').at(0).text()).toEqual('Near Me');
    expect(component.find('li').at(1).text()).toEqual('Map');
    expect(component.find('li').at(2).text()).toEqual('Profile');
  });
});
