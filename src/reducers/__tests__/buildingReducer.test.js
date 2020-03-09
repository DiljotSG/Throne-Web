import buildingReducer from '../buildingReducer';
import * as actions from '../../constants/ActionTypes';

describe('action reducer', () => {
  it('should return the initial state', () => {
    expect(buildingReducer(undefined, {})).toEqual(
      {
        building: {},
        buildings: [],
      },
    );
  });

  it('should handle RECEIVE_BUILDINGS', () => {
    expect(
      buildingReducer([], {
        type: actions.RECEIVE_BUILDINGS,
        buildings: ['Building 1', 'Building 2'],
        status: 200,
      }),
    ).toEqual(
      {
        buildings: ['Building 1', 'Building 2'],
        isFetching: false,
        status: 200,
      },
    );
  });

  it('should handle REQUEST_BUILDINGS', () => {
    expect(
      buildingReducer([], {
        type: actions.REQUEST_BUILDINGS,
      }),
    ).toEqual(
      {
        isFetching: true,
      },
    );
  });

  it('should handle RECEIVE_BUILDING', () => {
    expect(
      buildingReducer([], {
        type: actions.RECEIVE_BUILDING,
        building: { building: 'Building 1' },
        status: 200,
      }),
    ).toEqual(
      {
        building: { building: 'Building 1' },
        isFetching: false,
        status: 200,
      },
    );
  });

  it('should handle REQUEST_BUILDING', () => {
    expect(
      buildingReducer([], {
        type: actions.REQUEST_BUILDING,
      }),
    ).toEqual(
      {
        isFetching: true,
      },
    );
  });

  it('should handle FAILURE', () => {
    expect(
      buildingReducer([], {
        type: actions.FAILURE,
        status: 401,
      }),
    ).toEqual(
      {
        isFetching: false,
        status: 401,
      },
    );
  });
});
