const Review = require("../models/reviewModel");

exports.addReview = async (req, res) => {
  try {
    const { bookTitle, author, reviewText, rating } = req.body;
    const review = new Review({
      bookTitle,
      author,
      reviewText,
      rating,
      user: req.user._id,
    });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send({ error: "Error adding review" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate({
      path: "user",
      select: "userName email",
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editReview = async (req, res) => {
  const { id } = req.params;
  const { bookTitle, author, reviewText, rating } = req.body;
  try {
    const review = await Review.findOne({ _id: id, user: req.user.id });
    if (!review) return res.status(404).json({ error: "Review not found" });

    review.bookTitle = bookTitle;
    review.author = author;
    review.reviewText = reviewText;
    review.rating = rating;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id).populate({
      path: "user",
      select: "userName email",
    });
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
