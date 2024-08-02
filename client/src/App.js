import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import NavBar from "./Components/Header/NavBar";
import AddReviewForm from "./Components/Book/AddReviewForm";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import EditReviewForm from "./Components/Book/EditReviewForm";
import BookReviewsList from "./Components/Book/BookReviewsList";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/addReview"
            element={<PrivateRoute element={<AddReviewForm />} />}
          />
          <Route
            path="/editReview/:id"
            element={<PrivateRoute element={<EditReviewForm />} />}
          />
          <Route path="/read" element={<BookReviewsList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
