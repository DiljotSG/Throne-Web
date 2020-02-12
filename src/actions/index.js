import GET_WASHROOMS from '../constants';

// TODO: remove the lint ignore here once we have more actions
export const getWashrooms = () => (dispatch) => { // eslint-disable-line import/prefer-default-export, max-len
  dispatch({
    type: GET_WASHROOMS,
    payload: ['Tache Hall', '6th Floor E2', "Aaron's House", '151 Research', 'University Center', "McDonald's Kenaston", '3rd Floor Science and Technology Library', "Wendy's Kenaston", 'Armes Tunnel Level', "Eric's House", "Tyler's House", 'University College Tunnel Level'],
  });
};
