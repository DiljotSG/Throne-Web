import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';


import Login from '../Login';


describe('Login', () => {
  it('knows that 2 and 2 make 4', () => {
    const component = mount(
      <Router>
        <Login
          loginAddress={() => {}}
          signUpAddress={() => {}}
        />
      </Router>,
    );

    expect(component.find('h1').length).toBe(1);
    expect(component.find('h1').at(0).text()).toBe('Welcome to Throne');
    expect(component.find('Button').length).toBe(2);
    expect(component.find('Button').at(0).text()).toBe('Login');
    expect(component.find('Button').at(1).text()).toBe('Sign Up');
  });
});
