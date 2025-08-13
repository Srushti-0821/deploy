import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../redux/posts/postActions";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.posts);
  const [post, setPost] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
    }
  }, [posts, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
      navigate("/");
    }
  };

  if (!post) return <div>Loading post...</div>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Img variant="top" src={post.image} />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
              <Card.Text>
                <strong>Category:</strong> {post.category}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Date: {post.date}</small>
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Link to={`/edit/${post.id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetails;