// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPosts } from "../redux/posts/postActions";
// import { Link } from "react-router-dom";
// import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

// const PostList = () => {
//   const dispatch = useDispatch();
//   const { posts } = useSelector((state) => state.posts);

//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date");

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

//   const handleSort = (a, b) => {
//     if (sortBy === "date") {
//       return new Date(b.date) - new Date(a.date);
//     }
//     return 0; 
//   };

//   const filteredPosts = posts
//     .filter((post) =>
//       categoryFilter === "all" ? true : post.category === categoryFilter
//     )
//     .sort(handleSort);

//   return (
//     <Container>
//       <h2 className="my-4">All Blog Posts</h2>

//       <Row className="mb-3">
//         <Col md={4}>
//           <Form.Select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//           >
//             <option value="all">All Categories</option>
//             <option value="General">General</option>
//             <option value="Tech">Tech</option>
//             <option value="Life">Life</option>
//           </Form.Select>
//         </Col>

//         <Col md={4}>
//           <Form.Select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="date">Sort by Date</option>
//             <option value="popularity">Sort by Popularity</option>
//           </Form.Select>
//         </Col>
//       </Row>

//       <Row>
//         {filteredPosts.map((post) => (
//           <Col md={4} key={post.id} className="mb-4">
//             <Card>
//               <Card.Img variant="top" src={post.image} />
//               <Card.Body>
//                 <Card.Title>{post.title}</Card.Title>
//                 <Card.Text>{post.description.substring(0, 100)}...</Card.Text>
//                 <Card.Text>
//                   <small className="text-muted">Category: {post.category}</small>
//                 </Card.Text>
//                 <Link to={`/post/${post.id}`}>
//                   <Button variant="primary">Read More</Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default PostList;

"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, deletePost } from "../redux/posts/postActions"
import { Link } from "react-router-dom"
import { Card, Button, Container, Row, Col, Form, Alert, Spinner } from "react-bootstrap"

const PostList = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts)

  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id))
    }
  }

  const handleSort = (a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date)
    }
    return 0
  }

  const filteredPosts = posts
    .filter((post) => (categoryFilter === "all" ? true : post.category === categoryFilter))
    .sort(handleSort)

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading posts...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error loading posts: {error}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <h2 className="my-4">All Blog Posts</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="General">General</option>
            <option value="Tech">Tech</option>
            <option value="Life">Life</option>
            <option value="Programming">Programming</option>
            <option value="Health">Health</option>
            <option value="Design">Design</option>
            <option value="React">React</option>
            <option value="Learning">Learning</option>
            <option value="Tools">Tools</option>
            <option value="Community">Community</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Web">Web</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="popularity">Sort by Popularity</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredPosts.length === 0 ? (
          <Col>
            <Alert variant="info">No posts found matching your criteria.</Alert>
          </Col>
        ) : (
          filteredPosts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description.substring(0, 100)}...</Card.Text>
                  <Card.Text>
                    <small className="text-muted">Category: {post.category}</small>
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">Date: {post.date}</small>
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Link to={`/post/${post.id}`}>
                      <Button variant="primary" size="sm">
                        Read More
                      </Button>
                    </Link>
                    <Link to={`/edit/${post.id}`}>
                      <Button variant="warning" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}

export default PostList
