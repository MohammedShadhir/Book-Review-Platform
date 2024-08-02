const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviews,
  editReview,
  deleteReview,
  getReviewById,
} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, addReview);
router.get("/", getReviews);
router.get("/:id", authMiddleware, getReviewById);
router.put("/:id", authMiddleware, editReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
