import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";
import axios from "axios";

export const addPost = postData => dispatch => {
  dispatch(setLoadingState());
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
        type: GET_POSTS,
        payload: null
      });
    });
};
//Get Post By ID
export const getPostById = id => dispatch => {
  dispatch(setLoadingState());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};
//Delete post
export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add likes
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add likes
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set loading state
export const setLoadingState = () => {
  return { type: POST_LOADING };
};
