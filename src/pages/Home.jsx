import React from "react";
import PostList from "../Component/PostList";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="my-4">
      <h1 className="mb-4 text-center">Welcome to the Blog</h1>
      <PostList />
    </Container>
  );
};

export default Home;