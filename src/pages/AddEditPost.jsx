import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost, getPosts } from "../redux/posts/postActions";
import PostForm from "../Component/PostForm";
import { Container } from "react-bootstrap";

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const foundPost = posts.find((p) => p.id === Number(id));
      if (foundPost) {
        setInitialData(foundPost);
      }
    }
  }, [id, posts]);

  const handleFormSubmit = (formData) => {
    if (id) {
      dispatch(updatePost(id, formData));
    } else {
      dispatch(addPost(formData));
    }
    navigate("/");
  };

  return (
    <Container className="my-4">
      <h2>{id ? "Edit Post" : "Add New Post"}</h2>
      <PostForm onSubmit={handleFormSubmit} initialData={initialData} />
    </Container>
  );
};

export default AddEditPost;