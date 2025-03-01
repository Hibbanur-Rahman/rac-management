const express = require("express");
const {
  getMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getUpcomingMeetings,
  getMeetingsByDate,
} = require("../controllers/meetingController.js");
const { protect, checkRole } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all meetings
router
  .route("/")
  .get(protect, getMeetings)
  .post(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    createMeeting
  );

// Get meeting by ID
router
  .route("/:id")
  .get(protect, getMeetingById)
  .put(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    updateMeeting
  )
  .delete(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    deleteMeeting
  );

// Get upcoming meetings
router.route("/upcoming").get(protect, getUpcomingMeetings);

// Get meetings by date
router.route("/date/:date").get(protect, getMeetingsByDate);

module.exports = router;
