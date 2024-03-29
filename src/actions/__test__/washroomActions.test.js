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

  it('creates RECEIVE_WASHROOMS event when washrooms are received', () => {
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

  it('creates RECEIVE_WASHROOM event when a washroom is received', () => {
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

  it('creates RECEIVE_CREATED_WASHROOM event when a washroom is created', () => {
    const washroom = {
      comment: 'looks great',
      gender: 'men',
      floor: 3,
      urinalCount: 1,
      stallCount: 1,
      washroomAmenities: [amenities.AIR_DRYER, amenities.CALL_BUTTON],
    };
    const building = {
      id: 0,
      location: {
        latitude: 12,
        longitude: 13,
      },
    };
    fetchMock.postOnce('https://testapi.com/washrooms', { comment: 'Washroom 1' });

    const expectedActions = [
      { type: types.CREATE_WASHROOM },
      { type: types.RECEIVE_CREATED_WASHROOM, status: 200, washroom: { comment: 'Washroom 1' } },
    ];

    const store = mockStore({ washroom: {} });
    return store.dispatch(actions.createWashroom(
      building,
      washroom,
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_FAVORITE event when washroom favorited', () => {
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

  it('creates RECEIVE_FAVORITE event when washroom is unfavorited', () => {
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
});
