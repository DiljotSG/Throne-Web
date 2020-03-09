import React from 'react';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import Login from '../Login';

describe('Login', () => {
  it('renders title text and two buttons', () => {
    const component = mount(
      <Router>
        <Login
          loginAddress="https://login.findmythrone.com"
          signUpAddress="https://signup.findmythrone.com"
        />
      </Router>,
    );

    expect(component.find('h1').length).toBe(1);
    expect(component.find('h1').at(0).text()).toBe('Welcome to Throne');

    expect(component.find('Button').length).toBe(2);

    const loginButton = component.find('Button').at(0);
    expect(loginButton.text()).toBe('Login');
    expect(loginButton.prop('type')).toBe('primary');
    expect(loginButton.prop('href')).toBe('https://login.findmythrone.com');

    const signUpButton = component.find('Button').at(1);
    expect(signUpButton.text()).toBe('Sign Up');
    expect(signUpButton.prop('href')).toBe('https://signup.findmythrone.com');
  });
});
