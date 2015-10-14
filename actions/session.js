import jwtDecode from 'jwt-decode';
import { auth } from '../lib/api';
import env from '../lib/env';

/**
 * Constants
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const DECODE_JWT_SUCCESS = 'DECODE_JWT_SUCCESS';
export const DECODE_JWT_FAILURE = 'DECODE_JWT_FAILURE';

/**
 * Authenticate user
 */

export function login({email, password}) {
  return dispatch => {
    dispatch(loginRequest(email));
    return auth({
      email,
      password,
      api_key: env.API_KEY
    })
    .then(json => dispatch(loginSuccess(json)))
    .then(json => dispatch(decodeJWTSuccess(json)))
    .catch(err => dispatch(loginFailure(err.message)));
  };
}

function loginRequest(email) {
  return {
    type: LOGIN_REQUEST,
    email
  };
}

function loginSuccess(json) {
  localStorage.setItem('accessToken', json.access_token);
  localStorage.setItem('refreshToken', json.refresh_token);

  return {
    type: LOGIN_SUCCESS,
    json,
    receivedAt: Date.now(),
  };
}

function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
    receivedAt: Date.now(),
  };
}

/**
 * Load info from JWT if it exists
 */

export function decodeJWT() {

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return decodeJWTFailure();
  }

  const json = jwtDecode(accessToken);
  return json.id ? decodeJWTSuccess(json) : decodeJWTFailure();
}

function decodeJWTFailure() {
  return {
    type: DECODE_JWT_FAILURE,
    redirectTo: '/login'
  };
}

function decodeJWTSuccess(json) {
  return {
    type: DECODE_JWT_SUCCESS,
    info: json,
  };
}
