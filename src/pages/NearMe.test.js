import React from 'react';
import { shallow } from 'enzyme';

import NearMe from './NearMe';

describe('NearMe', () => {
  it('Renders the "Near me" page', () => {
    const component = shallow(<NearMe />);

    expect(component.text()).toEqual('Near Me');
  });
});
