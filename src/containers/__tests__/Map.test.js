import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import Map from '../Map';

export default function setupStore(initialState) {
  return createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));
}

const store = setupStore({});

fetchMock.get('https://testapi.com/buildings?location=undefined&maxResults=undefined&radius=undefined&amenities=undefined', [
  {
    best_ratings: {
      cleanliness: 5.0,
      privacy: 4.0,
      smell: 1.0,
      toilet_paper_quality: 3.0,
    },
    created_at: '2020-03-05T13:02:49+00:00',
    id: 1,
    location: {
      latitude: 49.81175231933594,
      longitude: -97.13582611083984,
    },
    maps_service_id: 54724739,
    overall_rating: 3.25,
    title: 'Wallace Building',
    washroom_count: 1,
  },
  {
    best_ratings: {
      cleanliness: 2.7142856121063232,
      privacy: 2.5714285373687744,
      smell: 2.5714285373687744,
      toilet_paper_quality: 2.7142856121063232,
    },
    created_at: '2020-03-05T13:02:50+00:00',
    id: 2,
    location: {
      latitude: 49.809364318847656,
      longitude: -97.1344985961914,
    },
    maps_service_id: 54724743,
    overall_rating: 2.642857074737549,
    title: 'University Centre',
    washroom_count: 0,
  },
]);

describe('Map', () => {
  it('Renders the "Map" page', async () => {
    await act(async () => {
      const component = mount(
        <Router>
          <Map store={store} />
        </Router>,
      );

      expect(component.find('Title').text()).toEqual('Map');
      const map = component.find('InteractiveMap');
      expect(map.length).toEqual(1);
      expect(map.first().prop('latitude')).toEqual(49.8080954);
      expect(map.first().prop('longitude')).toEqual(-97.1375209);
      expect(map.first().prop('zoom')).toEqual(14);
    });
  });
});
