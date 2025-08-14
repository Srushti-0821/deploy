import axios from "axios"
import { GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, POST_ERROR } from "./postTypes"

const API_URL = "http://localhost:3000/posts"

// Create axios instance with default configuration
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getPosts = () => async (dispatch) => {
  try {
    const response = await api.get("/posts")
    dispatch({ type: GET_POSTS, payload: response.data })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const addPost = (post) => async (dispatch) => {
  try {
    const response = await api.post("/posts", post)
    dispatch({ type: ADD_POST, payload: response.data })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const response = await api.put(`/posts/${id}`, post)
    dispatch({ type: UPDATE_POST, payload: response.data })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`)
    dispatch({ type: DELETE_POST, payload: id })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const getPostById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/posts/${id}`)
    return response.data
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response?.data?.message || error.message,
    })
  }
}