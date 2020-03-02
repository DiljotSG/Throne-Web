import actions from '../constants';

import throneApi from '../api/throneApi';
import { failure } from '.';

export function requestBuildings() {
  return {
    type: actions.REQUEST_BUILDINGS,
  };
}

export const receiveBuildings = (response, status) => (
  {
    type: actions.RECEIVE_BUILDINGS,
    buildings: response,
    status,
  }
);

export function getBuildings() {
  return async function fetchBuildingsAsync(dispatch) {
    dispatch(requestBuildings());

    return throneApi.getBuildings().then((response) => {
      if (response.ok) {
        response.json().then((buildings) => {
          dispatch(receiveBuildings(buildings, response.status));
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
