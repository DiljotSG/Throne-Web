import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('Renders the header', () => {
    const app = shallow(<App />);
    expect(app.text()).toEqual('Throne');
  });
});
