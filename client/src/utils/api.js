export const BASE_URL = "http://127.0.0.1:8000/api/v1";

export const API_ENDPOINTS = {
  SIGN_IN: `${BASE_URL}/user/login/`,
  SIGN_UP: `${BASE_URL}/user/register/`,
  SIGN_OUT: `${BASE_URL}/user/logout/`,
  PROFILE: `${BASE_URL}/user/profile/`,
  BOOK_APPOINTMENT: `${BASE_URL}/appointment/create/`,
  GET_APPOINTMENTS: `${BASE_URL}/appointment/`,
  GET_DOCTORS: `${BASE_URL}/doctor/`,
};
