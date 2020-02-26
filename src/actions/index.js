import actions from '../constants';

export const failure = (status) => ( // eslint-disable-line import/prefer-default-export
  {
    type: actions.FAILURE,
    status,
  }
);
