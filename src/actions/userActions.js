import actions from '../constants';

import throneApi from '../api/throneApi';
import { failure } from '.';

export function requestCurrentUser() {
  return {
    type: actions.REQUEST_CURRENT_USER,
  };
}

export const receiveCurrentUser = (response, status) => (
  {
    type: actions.RECEIVE_CURRENT_USER,
    user: response,
    status,
  }
);

export function requestUser() {
  return {
    type: actions.REQUEST_USER,
  };
}

export const receiveUser = (response, status) => (
  {
    type: actions.RECEIVE_USER,
    user: response,
    status,
  }
);

export function getCurrentUser() {
  return async function fetchUserAsync(dispatch) {
    dispatch(requestCurrentUser());

    return throneApi.getCurrentUser().then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          dispatch(receiveCurrentUser(user, response.status));
        });
      } else {
        dispatch(failure(response.status));
      }
    }).catch((error) => {
      dispatch(failure());
      throw (error);
    });
  };
}
