import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../buildingActions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const buildingQueryParams = 'max_results=undefined&radius=undefined&amenities=undefined';

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVE_BUILDINGS event when buildings are received', () => {
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
});
