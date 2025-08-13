import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    category: "General",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Title and description are required!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter post title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter post description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image URL"
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
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Post
      </Button>
    </Form>
  );
};

export default PostForm;