const express = require("express");
const {
  getDocuments,
  getDocumentById,
  uploadDocument,
  downloadDocument,
  deleteDocument,
} = require("../controllers/documentController.js");
const { protect, checkRole } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/multerMiddleware.js");
const router = express.Router();

// Get all documents
router
  .route("/")
  .get(protect, getDocuments)
  .post(protect, upload.single("file"), uploadDocument);

// Get document by ID
router
  .route("/:id")
  .get(protect, getDocumentById)
  .delete(
    protect,
    checkRole(["admin", "coordinator", "supervisor"]),
    deleteDocument
  );

// Download document
router.route("/:id/download").get(protect, downloadDocument);

module.exports = router;
