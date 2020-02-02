import React from 'react';
import { shallow } from 'enzyme';

import Map from './Map';

describe('Map', () => {
  it('Renders the Map page', () => {
    const component = shallow(<Map />);

    expect(component.text()).toEqual('Map');
  });
});
