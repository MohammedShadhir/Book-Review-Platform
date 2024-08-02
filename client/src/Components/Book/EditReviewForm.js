import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { fetchReviewById, updateReview } from "../../services/reviewService";

const EditReviewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReview = async () => {
      try {
        const review = await fetchReviewById(id, auth?.token);
        // Set form values with fetched data
        setValue("bookTitle", review.bookTitle);
        setValue("author", review.author);
        setValue("reviewText", review.reviewText);
        setValue("rating", review.rating);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching review:", error);
        setLoading(false);
      }
    };

    loadReview();
  }, [id, auth?.token, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateReview(id, data, auth?.token);
      Swal.fire({
        title: "Success!",
        text: "Review updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the review.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5">Edit Review</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Book Title"
          {...register("bookTitle", { required: "Book Title is required" })}
          fullWidth
          margin="normal"
          error={!!errors.bookTitle}
          helperText={errors.bookTitle ? errors.bookTitle.message : ""}
        />
        <TextField
          label="Author"
          {...register("author", { required: "Author is required" })}
          fullWidth
          margin="normal"
          error={!!errors.author}
          helperText={errors.author ? errors.author.message : ""}
        />
        <TextField
          label="Review Text"
          {...register("reviewText", { required: "Review Text is required" })}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          error={!!errors.reviewText}
          helperText={errors.reviewText ? errors.reviewText.message : ""}
        />
        <TextField
          label="Rating (1-5)"
          type="number"
          {...register("rating", {
            required: "Rating is required",
            min: { value: 1, message: "Rating must be at least 1" },
            max: { value: 5, message: "Rating cannot exceed 5" },
          })}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 5 }}
          error={!!errors.rating}
          helperText={errors.rating ? errors.rating.message : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditReviewForm;
