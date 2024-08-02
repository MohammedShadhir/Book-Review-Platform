import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { fetchUserReviews, deleteReview } from "../../services/reviewService";
import BookCard from "../Card/BookCard";

const BookReviewsList = () => {
  const { auth } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const allReviews = await fetchUserReviews();
      setReviews(allReviews);
      setFilteredReviews(allReviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter((review) => {
      const bookTitle = review.bookTitle || "";
      const author = review.author || "";
      return (
        bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredReviews(filtered);
  }, [searchQuery, reviews]);

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
        await deleteReview(id, auth?.token);
        loadReviews();
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting the review.", "error");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        All Reviews
      </Typography>
      <TextField
        label="Search by title or author"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Box mt={8} p={2}>
        <Grid container spacing={4}>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((book) => (
              <Grid item xs={12} sm={5} md={4} key={book._id}>
                <BookCard book={book} onDelete={handleDelete} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No reviews found.</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookReviewsList;
