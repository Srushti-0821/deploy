import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_ERROR,
} from "./postTypes";

const initialState = {
  posts: [],
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case POST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};