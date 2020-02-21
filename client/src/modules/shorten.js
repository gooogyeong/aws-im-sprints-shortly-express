import { handleActions } from 'redux-actions';

import axios from 'axios';

const POST_URL_PENDING = 'POST_URL_PENDING';
const POST_URL_SUCCESS = 'POST_URL_SUCCESS';
const POST_URL_FAILURE = 'POST_URL_FAILUER';

function postUrlAPI(data) {
  return axios.post('http://3.135.237.103:3001/links', data); //http://localhost:3001
}

const initialState = {
  pending: false,
  error: false,
  data: null
};

export const shorten = data => dispatch => {
  dispatch({ type: POST_URL_PENDING });

  return postUrlAPI(data)
    .then(result => {
      dispatch({
        type: POST_URL_SUCCESS,
        payload: result.data
      });
    })
    .catch(error => {
      dispatch({
        type: POST_URL_FAILURE,
        payload: error
      });
    });
};

export default handleActions(
  {
    [POST_URL_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false
      };
    },
    [POST_URL_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload
      };
    },
    [POST_URL_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
  },
  initialState
);
