import React from 'react';
import { mount } from 'enzyme';

import NearMe from '../NearMe';

describe('NearMe', () => {
  it('Renders the "Near me" page', () => {
    const component = mount(<NearMe />);

    expect(component.find('Title').text()).toEqual('Near Me');
  });

  it('Displays a list of locations', () => {
    const locations = ['Location1', 'Location2'];
    const component = mount(<NearMe locations={locations} />);

    expect(component.find('li')).toHaveLength(2);
    expect(component.find('li').first().text()).toEqual('Location1');
    expect(component.find('li').at(1).text()).toEqual('Location2');
  });
});
