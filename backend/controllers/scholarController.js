const asyncHandler = require("../utils/asyncHandler.js");
const Scholar = require("../models/scholarModel.js");
const User = require("../models/userModel.js");
const RacReport = require("../models/racReportModel.js");
const Document = require("../models/documentModel.js");

// @desc    Get all scholars
// @route   GET /api/scholars
// @access  Private
const getScholars = asyncHandler(async (req, res) => {
  const scholars = await Scholar.find({})
    .populate("supervisorId", "salutation name")
    .populate("hodNomineeId", "salutation name")
    .populate("supervisorNomineeId", "salutation name");
  res.json(scholars);
});

// @desc    Get scholar by ID
// @route   GET /api/scholars/:id
// @access  Private
const getScholarById = asyncHandler(async (req, res) => {
  const scholar = await Scholar.findById(req.params.id)
    .populate("supervisorId", "salutation name")
    .populate("hodNomineeId", "salutation name")
    .populate("supervisorNomineeId", "salutation name");

  if (scholar) {
    res.json(scholar);
  } else {
    res.status(404);
    throw new Error("Scholar not found");
  }
});

// @desc    Create a scholar
// @route   POST /api/scholars
// @access  Private/Admin
const createScholar = asyncHandler(async (req, res) => {
  const {
    name,
    rollNo,
    gender,
    dateOfAdmission,
    researchTopic,
    fullTime,
    status,
    supervisorId,
    hodNomineeId,
    supervisorNomineeId,
    userId,
  } = req.body;

  // Check if scholar with this roll number already exists
  const scholarExists = await Scholar.findOne({ rollNo });

  if (scholarExists) {
    res.status(400);
    throw new Error("Scholar with this roll number already exists");
  }

  // Create scholar
  const scholar = await Scholar.create({
    name,
    rollNo,
    gender,
    dateOfAdmission,
    researchTopic,
    fullTime,
    status,
    supervisorId,
    hodNomineeId,
    supervisorNomineeId,
    userId,
  });

  if (scholar) {
    res.status(201).json(scholar);
  } else {
    res.status(400);
    throw new Error("Invalid scholar data");
  }
});

// @desc    Update a scholar
// @route   PUT /api/scholars/:id
// @access  Private/Admin
const updateScholar = asyncHandler(async (req, res) => {
  const scholar = await Scholar.findById(req.params.id);

  if (scholar) {
    scholar.name = req.body.name || scholar.name;
    scholar.rollNo = req.body.rollNo || scholar.rollNo;
    scholar.gender = req.body.gender || scholar.gender;
    scholar.dateOfAdmission =
      req.body.dateOfAdmission || scholar.dateOfAdmission;
    scholar.preSubmissionDate =
      req.body.preSubmissionDate || scholar.preSubmissionDate;
    scholar.thesisSubmissionDate =
      req.body.thesisSubmissionDate || scholar.thesisSubmissionDate;
    scholar.vivaVoceDate = req.body.vivaVoceDate || scholar.vivaVoceDate;
    scholar.researchTopic = req.body.researchTopic || scholar.researchTopic;
    scholar.fullTime =
      req.body.fullTime !== undefined ? req.body.fullTime : scholar.fullTime;
    scholar.status = req.body.status || scholar.status;
    scholar.dateOfAward = req.body.dateOfAward || scholar.dateOfAward;
    scholar.supervisorId = req.body.supervisorId || scholar.supervisorId;
    scholar.hodNomineeId = req.body.hodNomineeId || scholar.hodNomineeId;
    scholar.supervisorNomineeId =
      req.body.supervisorNomineeId || scholar.supervisorNomineeId;

    const updatedScholar = await scholar.save();
    res.json(updatedScholar);
  } else {
    res.status(404);
    throw new Error("Scholar not found");
  }
});

// @desc    Delete a scholar
// @route   DELETE /api/scholars/:id
// @access  Private/Admin
const deleteScholar = asyncHandler(async (req, res) => {
  const scholar = await Scholar.findById(req.params.id);

  if (scholar) {
    await scholar.deleteOne();
    res.json({ message: "Scholar removed" });
  } else {
    res.status(404);
    throw new Error("Scholar not found");
  }
});

// @desc    Get scholar's RAC reports
// @route   GET /api/scholars/:id/rac-reports
// @access  Private
const getScholarRacReports = asyncHandler(async (req, res) => {
  const scholarId = req.params.id;

  const racReports = await RacReport.find({ scholarId })
    .populate("reviews")
    .populate("recommendations")
    .sort({ racNumber: 1 });

  res.json(racReports);
});

// @desc    Get scholar's documents
// @route   GET /api/scholars/:id/documents
// @access  Private
const getScholarDocuments = asyncHandler(async (req, res) => {
  const scholarId = req.params.id;

  const documents = await Document.find({ scholarId })
    .populate("uploadedById", "name")
    .sort({ uploadDate: -1 });

  res.json(documents);
});

module.exports = {
  getScholars,
  getScholarById,
  createScholar,
  updateScholar,
  deleteScholar,
  getScholarRacReports,
  getScholarDocuments,
};
