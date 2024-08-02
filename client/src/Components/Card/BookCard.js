import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReviewIcon from "@mui/icons-material/RateReview";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookCard = ({ book, onDelete }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log("Edit book with id:", id);
    navigate(`/editReview/${id}`);
  };

  const handleReadMore = () => {
    Swal.fire({
      title: book.bookTitle,
      html: `
        <div style="font-size: 16px; line-height: 1.5;">
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Rating:</strong> ${book.rating || 0}</p>
          <p><strong>Reviewer:</strong> ${book.user.userName}</p>
          <p><strong>Review:</strong></p>
          <p>${book.reviewText}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#3085d6",
      background: "#fff",
      customClass: {
        title: "swal2-title",
        htmlContainer: "swal2-html-container",
        confirmButton: "swal2-confirm",
      },
      width: "70%",
      padding: "20px",
    });
  };

  const canEditOrDelete = auth.user && auth.user._id === book.user._id;

  return (
    <Card
      sx={{
        Width: 345,
        height: 300,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        transition: "height 0.3s ease",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {book.bookTitle}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Rating name="read-only" value={book.rating || 0} readOnly />
          <Chip
            label={`Rating: ${book.rating || 0}`}
            color="primary"
            sx={{ ml: 2 }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            maxHeight: 100,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            paddingBottom: 2,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Reviewer: {book.user.userName}
          </Typography>
          <Typography variant="body2" mt={2}>
            {book.reviewText}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        {canEditOrDelete && (
          <>
            <IconButton color="primary" onClick={() => handleEdit(book._id)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(book._id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
        <IconButton color="info" onClick={() => handleReadMore()}>
          <ReviewIcon />
        </IconButton>
        {/* <Button onClick={() => handleReadMore()} sx={{ ml: 2 }}>
          {expanded ? "Read Less" : "Read More"}
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default BookCard;
