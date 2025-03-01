const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Public routes
router.post("/", registerUser);
router.post("/login", loginUser);

// Protected routes
router
  .route("/profile", getUserProfile)
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes
router.route("/").get(protect, admin, getUsers);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
