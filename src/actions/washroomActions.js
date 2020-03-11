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

export function requestWashroom() {
  return {
    type: actions.REQUEST_WASHROOM,
  };
}

export const receiveWashroom = (response, status) => (
  {
    type: actions.RECEIVE_WASHROOM,
    washroom: response,
    status,
  }
);

export function getWashrooms() {
  return async function fetchWashroomsAsync(dispatch) {
    dispatch(requestWashrooms());

    return throneApi.getWashrooms().then((response) => {
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

export function getWashroom(id) {
  return async function fetchWashroomAsync(dispatch) {
    dispatch(requestWashroom());

    return throneApi.getWashroom(id).then((response) => {
      if (response.ok) {
        response.json().then((washroom) => {
          dispatch(receiveWashroom(washroom, response.status));
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

// add getWashroomByBuilding(id) here
// add action for getting washrooms but don't need to add one for recieving
