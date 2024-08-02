import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import BookCard from "../Components/Card/BookCard";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { fetchUserReviews, deleteReview } from "../services/reviewService";
import { updateUserProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState({ userName: "", email: "" });
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(false);

  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const userReviews = await fetchUserReviews(auth.user._id, auth.token);
        setReviews(userReviews);
      } catch (error) {
        console.error("Failed to load reviews");
      }
    };

    loadReviews();
  }, [auth.user._id, auth.token]);

  useEffect(() => {
    if (auth.user) {
      console.log(auth.user);
      setUser({ userName: auth.user.username, email: auth.user.email });
      setValue("username", auth.user.username);
      setValue("email", auth.user.email);
    }
  }, [auth, setValue]);

  const handleEditToggle = () => setEditing(!editing);

  const handleSave = async (data) => {
    try {
      const updatedUser = await updateUserProfile(data, auth.token);
      setUser(updatedUser);
      setEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating your profile.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this review!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteReview(id, auth.token);
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire("Error!", "There was an error deleting the review.", "error");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      {editing ? (
        <Box mb={4}>
          <form onSubmit={handleSubmit(handleSave)}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={handleEditToggle}
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      ) : (
        <Box mb={4}>
          <Typography variant="h6">Username: {user.userName}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Button
            onClick={handleEditToggle}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>
        My Reviews
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((book) => (
          <Grid item xs={12} sm={5} md={4} key={book.id}>
            <BookCard book={book} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Profile;
