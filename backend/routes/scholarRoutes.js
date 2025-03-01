const express = require("express");
const {
  getScholars,
  getScholarById,
  createScholar,
  updateScholar,
  deleteScholar,
  getScholarRacReports,
  getScholarDocuments,
} = require("../controllers/scholarController.js");
const {
  protect,
  admin,
  checkRole,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all scholars
router
  .route("/")
  .get(protect, getScholars)
  .post(protect, checkRole(["admin", "coordinator"]), createScholar);

// Get scholar by ID
router
  .route("/:id")
  .get(protect, getScholarById)
  .put(protect, checkRole(["admin", "coordinator"]), updateScholar)
  .delete(protect, admin, deleteScholar);

// Get scholar's RAC reports
router.route("/:id/rac-reports").get(protect, getScholarRacReports);

// Get scholar's documents
router.route("/:id/documents").get(protect, getScholarDocuments);

module.exports = router;
