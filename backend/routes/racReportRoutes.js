const express = require("express");
const {
  getRacReports,
  getRacReportById,
  createRacReport,
  updateRacReport,
  deleteRacReport,
  addReview,
  addRecommendation,
} = require("../controllers/racReportController.js");
const { protect, checkRole } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all RAC reports
router
  .route("/")
  .get(protect, getRacReports)
  .post(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    createRacReport
  );

// Get RAC report by ID
router
  .route("/:id")
  .get(protect, getRacReportById)
  .put(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    updateRacReport
  )
  .delete(protect, checkRole(["admin", "coordinator"]), deleteRacReport);

// Add review to RAC report
router
  .route("/:id/reviews")
  .post(protect, checkRole(["admin", "coordinator", "supervisor"]), addReview);

// Add recommendation to RAC report
router
  .route("/:id/recommendations")
  .post(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    addRecommendation
  );

module.exports = router;
