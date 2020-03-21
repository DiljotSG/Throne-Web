import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../washroomActions';
import * as types from '../../constants/ActionTypes';
import * as amenities from '../../constants/WashroomAmenityTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it.only('creates RECEIVE_WASHROOMS event when washrooms are received', () => {
    fetchMock.getOnce(
      'https://testapi.com/washrooms?max_results=undefined&radius=undefined&amenities=undefined',
      ['Washroom 1', 'Washroom 2'],
    );
    const expectedActions = [
      { type: types.REQUEST_WASHROOMS },
      { type: types.RECEIVE_WASHROOMS, status: 200, washrooms: ['Washroom 1', 'Washroom 2'] },
    ];

    const store = mockStore({ washrooms: [] });
    return store.dispatch(actions.getWashrooms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it.only('creates RECEIVE_WASHROOM event when a washroom is received', () => {
    fetchMock.getOnce('https://testapi.com/washrooms/0', ['Washroom 1']);
    const expectedActions = [
      { type: types.REQUEST_WASHROOM },
      { type: types.RECEIVE_WASHROOM, status: 200, washroom: ['Washroom 1'] },
    ];

    const store = mockStore({ washrooms: [] });
    return store.dispatch(actions.getWashroom(0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it.only('creates RECEIVE_WASHROOM event when a washroom is created', () => {
    const comment = 'looks great';
    const longitude = 12;
    const latitude = 13;
    const gender = 'men';
    const floor = 3;
    const urinalCount = 1;
    const stallCount = 1;
    const buildingId = 0;
    const washroommAmenities = [amenities.AIR_DRYER_AMENITY, amenities.CALL_BUTTON_AMENITY];

    fetchMock.postOnce('https://testapi.com/washrooms', ['Washroom 1']);

    const expectedActions = [
      { type: types.CREATE_WASHROOM },
      { type: types.RECEIVE_WASHROOM, status: 200, washroom: ['Washroom 1'] },
    ];

    const store = mockStore({ washroom: [] });
    return store.dispatch(actions.createWashroom(
      comment,
      longitude,
      latitude,
      gender,
      floor,
      urinalCount,
      stallCount,
      buildingId,
      washroommAmenities,
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it.only('create RECEIVE_FAVORITE event when washroom favorited', () => {
    fetchMock.postOnce('https://testapi.com/users/favorites', 201, []);

    const expectedActions = [
      { type: types.ADD_FAVORITE },
      { type: types.RECEIVE_FAVORITE, status: 201, is_favorite: true },
    ];

    const store = mockStore({ status: 200, settingFavorite: false });
    return store.dispatch(actions.favoriteWashroom(0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it.only('create RECEIVE_FAVORITE event when washroom is unfavorited', () => {
    fetchMock.deleteOnce('https://testapi.com/users/favorites', 204, []);

    const expectedActions = [
      { type: types.REMOVE_FAVORITE },
      { type: types.RECEIVE_FAVORITE, status: 204, is_favorite: false },
    ];

    const store = mockStore({ status: 200, settingFavorite: false });
    return store.dispatch(actions.unfavoriteWashroom(0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FAILURE event when request fails', () => {
    fetchMock.getOnce('https://testapi.com/washrooms', 401, { Authorization: 'Failed' });

    const expectedActions = [
      { type: types.REQUEST_WASHROOMS },
      { type: types.FAILURE, status: 401 },
    ];

    const store = mockStore({ washrooms: [] });
    return store.dispatch(actions.getWashrooms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
