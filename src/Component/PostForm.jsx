// import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";

// const PostForm = ({ onSubmit, initialData = {} }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     image: "",
//     category: "General",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({ ...formData, ...initialData });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.description) {
//       alert("Title and description are required!");
//       return;
//     }
//     onSubmit(formData);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="formTitle">
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter post title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formDescription">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={4}
//           placeholder="Enter post description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formDate">
//         <Form.Label>Date</Form.Label>
//         <Form.Control
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formImage">
//         <Form.Label>Image URL</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Image URL"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formCategory">
//         <Form.Label>Category</Form.Label>
//         <Form.Select name="category" value={formData.category} onChange={handleChange}>
//           <option value="General">General</option>
//           <option value="Tech">Tech</option>
//           <option value="Life">Life</option>
//         </Form.Select>
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit Post
//       </Button>
//     </Form>
//   );
// };

// export default PostForm;


"use client"

import { useState, useEffect } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addPost, updatePost } from "../redux/posts/postActions"
import { useNavigate } from "react-router-dom"

const PostForm = ({ initialData = {}, isEdit = false, postId = null }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
    category: "General",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({ ...formData, ...initialData })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.title || !formData.description) {
      setError("Title and description are required!")
      return
    }

    setLoading(true)

    try {
      if (isEdit && postId) {
        await dispatch(updatePost(postId, formData))
      } else {
        await dispatch(addPost(formData))
      }

      // Reset form after successful submission
      if (!isEdit) {
        setFormData({
          title: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
          image: "",
          category: "General",
        })
      }

      // Navigate back to posts list
      navigate("/")
    } catch (err) {
      setError("Failed to save post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter post description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com/image.jpg"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" value={formData.category} onChange={handleChange}>
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
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} className="me-2">
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
              {isEdit ? "Updating..." : "Adding..."}
            </>
          ) : isEdit ? (
            "Update Post"
          ) : (
            "Add Post"
          )}
        </Button>

        <Button variant="secondary" onClick={() => navigate("/")} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </>
  )
}

export default PostForm
