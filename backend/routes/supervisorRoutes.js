const express = require("express");
const {
  getSupervisors,
  getSupervisorById,
  createSupervisor,
  updateSupervisor,
  deleteSupervisor,
  getSupervisorScholars,
  getSupervisorCommittees,
  getCoordinator,
} = require("../controllers/supervisorController.js");
const {
  protect,
  admin,
  checkRole,
  verifyToken,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all supervisors
router
  .route("/")
  .get(protect, getSupervisors)
  .post(protect, checkRole(["admin", "coordinator"]), createSupervisor);

// Get supervisor by ID
router
  .route("/:id")
  .get(protect, getSupervisorById)
  .put(protect, checkRole(["admin", "coordinator"]), updateSupervisor)
  .delete(protect, admin, deleteSupervisor);

// Get supervisor's scholars
router.route("/:id/scholars").get(protect, getSupervisorScholars);

// Get supervisor's committee memberships
router.route("/:id/committees").get(protect, getSupervisorCommittees);



module.exports = router;
