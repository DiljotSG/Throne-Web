import React from 'react';
import { mount } from 'enzyme';

import Map from '../Map';

describe('Map', () => {
  it('Renders the Map page', () => {
    const component = mount(<Map />);

    expect(component.find('Title').text()).toEqual('Map');
  });
});
