import washroomReducer from '../washroomReducer';
import * as actions from '../../constants/ActionTypes';

describe('action reducer', () => {
  it('should return the initial state', () => {
    expect(washroomReducer(undefined, {})).toEqual(
      {
        washrooms: [],
      },
    );
  });

  it('should handle RECEIVE_WASHROOMS', () => {
    expect(
      washroomReducer([], {
        type: actions.RECEIVE_WASHROOMS,
        washrooms: ['Washroom 1', 'Washroom 2'],
      }),
    ).toEqual(
      {
        washrooms: ['Washroom 1', 'Washroom 2'],
      },
    );
  });
});
