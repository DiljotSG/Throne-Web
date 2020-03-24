import React from 'react';
import { mount } from 'enzyme';

import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

import BuildingDetails from '../BuildingDetails';

import buildings from './data/buildings.json';
import washrooms from './data/washrooms.json';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/buildings/1', buildings[0]);
fetchMock.get('https://testapi.com/buildings/1/washrooms', washrooms);

describe('BuildingDetails', () => {
  it('Fetches building details', async () => {
    let component;

    await act(async () => {
      const match = { params: { id: '1' } };

      component = mount(
        <Router>
          <BuildingDetails
            store={store}
            match={match}
            location={{}}
          />
        </Router>,
      );
    });

    component.update();

    // Test Building details
    expect(component.find('.details-title').first().text()).toBe('Wallace Building');
    expect(component.find('.building-rate-overall').first().prop('value')).toBe(3);
    expect(component.find('.washroom-list-header').first().text()).toBe('Washrooms Inside');

    // Test building's washrooms list
    expect(component.find('.washroom-list-item-building-title').first().text()).toBe('Washroom 1');
    expect(component.find('.list-item-gender').first().text()).toBe('🚺');
    expect(component.find('.list-item-floor').first().text()).toBe('Floor 2');
    expect(component.find('.washroom-list-item-rating').first().prop('value')).toBe(5);
    expect(component.find('.washroom-list-item-distance-value').first().text()).toBe('19 m');
  });

  it('Creates a new washroom', async () => {
    let component;

    const washroomDetails = {
      comment: 'Test comment',
      gender: 'men',
      floor: 2,
      stall_count: 4,
      urinal_count: 7,
      building_id: 1,
      amenities: ['auto_sink', 'auto_toilet'],
    };

    await act(async () => {
      const match = { params: { id: '1' } };

      component = mount(
        <Router>
          <BuildingDetails
            store={store}
            match={match}
            location={{}}
          />
        </Router>,
      );
    });
    component.update();

    // Set Washroom
    component.find('BuildingDetails').setState({ washroom: washroomDetails });

    await act(async () => {
      await component.find('Button.washroom-display-modal').first().simulate('click');
    });
    component.update();

    const modal = component.find('Modal').first();

    const menRadioButton = modal.find('RadioButton.washroom-form-radio-button').at(2);

    // Check Fields
    expect(menRadioButton.prop('value')).toBe(washroomDetails.gender);
    expect(menRadioButton.find('Radio').prop('checked')).toBe(true);
    expect(modal.find('InputNumber.washroom-form-floor-input').first().prop('value')).toBe(washroomDetails.floor);
    expect(modal.find('InputNumber.washroom-form-stall-input').first().prop('value')).toBe(washroomDetails.stall_count);
    expect(modal.find('InputNumber.washroom-form-urinal-input').first().prop('value')).toBe(washroomDetails.urinal_count);
    expect(modal.find('Select.washroom-form-amenity-select').first().prop('value')).toBe(washroomDetails.amenities);
    expect(modal.find('TextArea.washroom-form-comment-text').first().prop('value')).toBe(washroomDetails.comment);
  });
});
