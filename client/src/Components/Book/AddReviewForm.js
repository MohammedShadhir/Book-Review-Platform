import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../services/reviewService";

const AddReviewForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    setLoading(true); // Set loading state to true

    try {
      await addReview(data, token);

      Swal.fire({
        title: "Success!",
        text: "Review added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error adding the review.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <Box p={3} width={{ md: "50%", xs: "80%" }}>
      <Typography variant="h5">Add a New Review</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Book Title"
          name="bookTitle"
          {...register("bookTitle", { required: "Book Title is required" })}
          fullWidth
          margin="normal"
          error={!!errors.bookTitle}
          helperText={errors.bookTitle ? errors.bookTitle.message : ""}
        />
        <TextField
          label="Author"
          name="author"
          {...register("author", { required: "Author is required" })}
          fullWidth
          margin="normal"
          error={!!errors.author}
          helperText={errors.author ? errors.author.message : ""}
        />
        <TextField
          label="Review Text"
          name="reviewText"
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
          name="rating"
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
          sx={{ mt: 2, width: { xs: "100%", md: "50%" } }}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Box>
  );
};

export default AddReviewForm;
