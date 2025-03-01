const Document = require("../models/documentModel");
const fs = require("fs");
const path = require("path");

// **1. Get All Documents**
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
};

// **2. Get a Single Document by ID**
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
};

// **3. Upload Document**
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newDocument = new Document({
      name: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id, // Assuming user is authenticated
    });

    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: "Error uploading document", error });
  }
};

// **4. Download Document**
const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });

    res.download(document.filePath, document.name);
  } catch (error) {
    res.status(500).json({ message: "Error downloading document", error });
  }
};

// **5. Delete Document**
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });

    // Delete file from storage
    fs.unlinkSync(document.filePath);

    await Document.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error });
  }
};

// Export the functions in CommonJS format
module.exports = {
  getDocuments,
  getDocumentById,
  uploadDocument,
  downloadDocument,
  deleteDocument,
};
