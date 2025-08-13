import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditPost from "./pages/AddEditPost";
import PostDetails from "./Component/PostDetails";
import PrivateRoute from "./Component/PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AddEditPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <AddEditPost />
          </PrivateRoute>
        }
      />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default AllRoutes;