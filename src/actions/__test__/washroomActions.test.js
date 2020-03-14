import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../washroomActions';
import * as types from '../../constants/ActionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVE_WASHROOMS event when washrooms are received', () => {
    fetchMock.getOnce('https://testapi.com/washrooms', ['Washroom 1', 'Washroom 2']);
    const expectedActions = [
      { type: types.REQUEST_WASHROOMS },
      { type: types.RECEIVE_WASHROOMS, status: 200, washrooms: ['Washroom 1', 'Washroom 2'] },
    ];

    const store = mockStore({ washrooms: [] });
    return store.dispatch(actions.getWashrooms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_WASHROOM event when a washroom is recieved', () => {
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

  it('create RECIEVE_FAVORITE event when washroom favorited', () => {
    fetchMock.postOnce('https://testapi.com/users/favorites', 201, []);

    const expectedActions = [
      { type: types.ADD_FAVORITE },
      { type: types.RECIEVE_FAVORITE, status: 201, is_favorite: true },
    ];

    const store = mockStore({ status: 200, settingFavorite: false });
    return store.dispatch(actions.favoriteWashroom(0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('create RECIEVE_FAVORITE event when washroom is unfavorited', () => {
    fetchMock.deleteOnce('https://testapi.com/users/favorites', 204, []);

    const expectedActions = [
      { type: types.REMOVE_FAVORITE },
      { type: types.RECIEVE_FAVORITE, status: 204, is_favorite: false },
    ];

    const store = mockStore({ status: 200, settingFavorite: false });
    return store.dispatch(actions.unfavoriteWashroom(0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
