import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get User token
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      //Save local storage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem("jwtToken", token);
      //Set token to Auth Header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//SET LOGIN USER
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
