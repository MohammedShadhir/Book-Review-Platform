const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getUserDetails,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/userDetails", authMiddleware, getUserDetails);

module.exports = router;
