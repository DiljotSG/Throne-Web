import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../buildingActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const buildingQueryParams = 'location=undefined&maxResults=undefined&radius=undefined&amenities=undefined';

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it.only('creates RECEIVE_BUILDINGS event when buildings are received', () => {
    fetchMock.getOnce(`https://testapi.com/buildings?${buildingQueryParams}`, ['Building 1', 'Building 2']);

    const expectedActions = [
      { type: types.REQUEST_BUILDINGS },
      { type: types.RECEIVE_BUILDINGS, status: 200, buildings: ['Building 1', 'Building 2'] },
    ];

    const store = mockStore({ buildings: [] });
    return store.dispatch(actions.getBuildings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FAILURE event when request fails', () => {
    fetchMock.getOnce('https://testapi.com/buildings', 401, { Authorization: 'Failed' });

    const expectedActions = [
      { type: types.REQUEST_BUILDINGS },
      { type: types.FAILURE, status: 401 },
    ];

    const store = mockStore({ buildings: [] });
    return store.dispatch(actions.getBuildings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
