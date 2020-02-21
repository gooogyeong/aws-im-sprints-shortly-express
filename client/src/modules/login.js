import { handleActions } from 'redux-actions';

import axios from 'axios';

const POST_LOGIN_PENDING = 'POST_LOGIN_PENDING';
const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILUER';

const LOGOUT = 'LOGOUT';

axios.defaults.withCredentials = true;

function postLoginAPI(data) {
  return axios.post('http://3.135.237.103:3001/user/signin', data); //
}

function postLogoutAPI() {
  return axios.post('http://3.135.237.103:3001/user/signout');
}

const initialState = {
  pending: false,
  error: false,
  isLogin: localStorage.getItem('isLogin') === 'true'
};

export const login = data => dispatch => {
  dispatch({ type: POST_LOGIN_PENDING });

  return postLoginAPI(data)
    .then(result => {
      dispatch({
        type: POST_LOGIN_SUCCESS,
        payload: result.data
      });
    })
    .catch(error => {
      dispatch({
        type: POST_LOGIN_FAILURE,
        payload: error
      });
    });
};

export const logout = data => dispatch => {
  return postLogoutAPI().then(result => {
    dispatch({ type: LOGOUT });
  });
};

export default handleActions(
  {
    [POST_LOGIN_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
        isLogin: false
      };
    },
    [POST_LOGIN_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
        isLogin: true
      };
    },
    [POST_LOGIN_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
        isLogin: false
      };
    },
    [LOGOUT]: (state, action) => {
      return {
        ...state,
        isLogin: false
      };
    }
  },
  initialState
);
