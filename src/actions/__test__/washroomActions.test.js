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

  it.only('creates RECEIVE_WASHROOMS event when washrooms are received', () => {
    fetchMock.getOnce(
      'https://testapi.com/washrooms?latitude=undefined&longitude=undefined&max_results=undefined&radius=undefined&amenities=undefined',
      ['Washroom 1', 'Washroom 2']
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
