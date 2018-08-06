import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from "./types";
import axios from "axios";

export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get posts
export const getPosts = () => dispatch => {
  dispatch(setLoadingState());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    });
};

//Set loading state
export const setLoadingState = () => {
  return { type: POST_LOADING };
};
