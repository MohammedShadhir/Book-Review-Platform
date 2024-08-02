import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ element, ...rest }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.token) {
    Swal.fire({
      icon: "info",
      title: "Access Denied",
      text: "You need to log in to access this page.",
      confirmButtonText: "Go to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });

    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
