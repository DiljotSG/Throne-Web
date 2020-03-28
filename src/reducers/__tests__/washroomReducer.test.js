import washroomReducer from '../washroomReducer';
import * as actions from '../../constants/ActionTypes';

describe('action reducer', () => {
  it('should return the initial state', () => {
    expect(washroomReducer(undefined, {})).toEqual(
      {
        washroom: {},
        washrooms: [],
      },
    );
  });

  it('should handle RECEIVE_WASHROOMS', () => {
    expect(
      washroomReducer([], {
        type: actions.RECEIVE_WASHROOMS,
        washrooms: ['Washroom 1', 'Washroom 2'],
        status: 200,
      }),
    ).toEqual(
      {
        washrooms: ['Washroom 1', 'Washroom 2'],
        isFetching: false,
        status: 200,
      },
    );
  });

  it('should handle REQUEST_WASHROOMS', () => {
    expect(
      washroomReducer([], {
        type: actions.REQUEST_WASHROOMS,
      }),
    ).toEqual(
      {
        isFetching: true,
      },
    );
  });

  it('should handle RECEIVE_WASHROOM', () => {
    expect(
      washroomReducer([], {
        type: actions.RECEIVE_WASHROOM,
        washroom: { washroom: 'Washroom 1' },
        status: 200,
      }),
    ).toEqual(
      {
        washroom: { washroom: 'Washroom 1' },
        isFetching: false,
        status: 200,
      },
    );
  });

  it('should handle CREATE_WASHROOM', () => {
    expect(
      washroomReducer([], {
        type: actions.CREATE_WASHROOM,
      }),
    ).toEqual(
      {
        isFetching: true,
        creatingWashroom: true,
      },
    );
  });

  it('should handle REQUEST_WASHROOM', () => {
    expect(
      washroomReducer([], {
        type: actions.REQUEST_WASHROOM,
      }),
    ).toEqual(
      {
        isFetching: true,
      },
    );
  });

  it('should handle FAILURE', () => {
    expect(
      washroomReducer([], {
        type: actions.FAILURE,
        status: 401,
      }),
    ).toEqual(
      {
        isFetching: false,
        creatingWashroom: false,
        status: 401,
      },
    );
  });
});
