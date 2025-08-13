import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_ERROR,
} from "./postTypes";

const API_URL = " http://localhost:3000/posts";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    dispatch({ type: ADD_POST, payload: data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: error.message });
  }
};