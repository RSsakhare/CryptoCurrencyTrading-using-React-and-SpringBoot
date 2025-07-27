import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";

// ✅ Base URL centralized for easier maintenance
const baseUrl = "http://localhost:5455";

// 🔹 Register User
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userData);
    const user = response.data;
    console.log(user);
    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt});
    console.log(user);

    localStorage.setItem("jwt",user.jwt);
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,payload: error.response?.data?.message || error.message,
    });
    console.log(error);
  }
};

// 🔹 Login User
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${baseUrl}/auth/signin`, userData.data);
    dispatch({ type: LOGIN_SUCCESS,payload: response.data.jwt});
    localStorage.setItem("jwt",response.data.jwt)
    userData.navigate("/")

  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔹 Get Current User Profile
export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axios.get(`${baseUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
}