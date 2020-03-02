import React from 'react';
import { mount } from 'enzyme';


import NearMeList from '../NearMeList';

const washrooms = [
  {
    title: 'Washroom 1',
    overall_rating: 3.0,
  }, {
    title: 'Washroom 2',
    overall_rating: 4.5,
  },
];

describe('Nav', () => {
  it('Renders the Nav page', () => {
    const component = mount(
      <NearMeList
        data={washrooms}
        isFetching={false}
      />,
    );

    expect(component.find('List Item').length).toEqual(2);

    const washroom1 = component.find('List Item').at(0);
    expect(washroom1.text()).toEqual('Washroom 1');
    expect(washroom1.find('Rate').at(0).prop('value')).toEqual(3);

    const washroom2 = component.find('List Item').at(1);
    expect(washroom2.text()).toEqual('Washroom 2');
    expect(washroom2.find('Rate').at(0).prop('value')).toEqual(4.5);
  });
});
