import actions from '../constants';

import throneApi from '../api/throneApi';
import { failure } from '.';

export function requestWashrooms() {
  return {
    type: actions.REQUEST_WASHROOMS,
  };
}

export const receiveWashrooms = (response, status) => (
  {
    type: actions.RECEIVE_WASHROOMS,
    washrooms: response,
    status,
  }
);

export function getWashrooms() {
  return async function fetchWashroomsAsync(dispatch) {
    dispatch(requestWashrooms());

    return throneApi.washrooms().then((response) => {
      if (response.ok) {
        response.json().then((washrooms) => {
          dispatch(receiveWashrooms(washrooms, response.status));
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
