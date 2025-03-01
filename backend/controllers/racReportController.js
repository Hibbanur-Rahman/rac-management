const asyncHandler = require("../utils/asyncHandler.js");
const RacReport = require("../models/racReportModel.js");
const Review = require("../models/reviewModel.js");
const Recommendation = require("../models/recommendationModel.js");
const Scholar = require("../models/scholarModel.js");

// @desc    Get all RAC reports
// @route   GET /api/rac-reports
// @access  Private
const getRacReports = asyncHandler(async (req, res) => {
  const racReports = await RacReport.find({})
    .populate({
      path: "scholarId",
      select: "name rollNo",
    })
    .populate({
      path: "reviews",
      populate: {
        path: "reviewerId",
        select: "salutation name",
      },
    })
    .populate("recommendations");

  res.json(racReports);
});

// @desc    Get RAC report by ID
// @route   GET /api/rac-reports/:id
// @access  Private
const getRacReportById = asyncHandler(async (req, res) => {
  const racReport = await RacReport.findById(req.params.id)
    .populate({
      path: "scholarId",
      select:
        "name rollNo researchTopic supervisorId hodNomineeId supervisorNomineeId",
      populate: [
        { path: "supervisorId", select: "salutation name" },
        { path: "hodNomineeId", select: "salutation name" },
        { path: "supervisorNomineeId", select: "salutation name" },
      ],
    })
    .populate({
      path: "reviews",
      populate: {
        path: "reviewerId",
        select: "salutation name",
      },
    })
    .populate("recommendations");

  if (racReport) {
    res.json(racReport);
  } else {
    res.status(404);
    throw new Error("RAC report not found");
  }
});

// @desc    Create a RAC report
// @route   POST /api/rac-reports
// @access  Private
const createRacReport = asyncHandler(async (req, res) => {
  const { scholarId, racNumber, dateOfPresentation } = req.body;

  // Check if scholar exists
  const scholar = await Scholar.findById(scholarId);
  if (!scholar) {
    res.status(404);
    throw new Error("Scholar not found");
  }

  // Check if RAC report with this number already exists for this scholar
  const existingReport = await RacReport.findOne({ scholarId, racNumber });
  if (existingReport) {
    res.status(400);
    throw new Error(`RAC report ${racNumber} already exists for this scholar`);
  }

  // Create RAC report
  const racReport = await RacReport.create({
    scholarId,
    racNumber,
    dateOfPresentation,
    status: "Pending",
  });

  if (racReport) {
    res.status(201).json(racReport);
  } else {
    res.status(400);
    throw new Error("Invalid RAC report data");
  }
});

// @desc    Update a RAC report
// @route   PUT /api/rac-reports/:id
// @access  Private
const updateRacReport = asyncHandler(async (req, res) => {
  const racReport = await RacReport.findById(req.params.id);

  if (racReport) {
    racReport.racNumber = req.body.racNumber || racReport.racNumber;
    racReport.dateOfPresentation =
      req.body.dateOfPresentation || racReport.dateOfPresentation;
    racReport.status = req.body.status || racReport.status;

    const updatedRacReport = await racReport.save();
    res.json(updatedRacReport);
  } else {
    res.status(404);
    throw new Error("RAC report not found");
  }
});

// @desc    Delete a RAC report
// @route   DELETE /api/rac-reports/:id
// @access  Private/Admin
const deleteRacReport = asyncHandler(async (req, res) => {
  const racReport = await RacReport.findById(req.params.id);

  if (racReport) {
    // Delete associated reviews and recommendations
    await Review.deleteMany({ racReportId: racReport._id });
    await Recommendation.deleteMany({ racReportId: racReport._id });

    await racReport.deleteOne();
    res.json({ message: "RAC report removed" });
  } else {
    res.status(404);
    throw new Error("RAC report not found");
  }
});

// @desc    Add a review to a RAC report
// @route   POST /api/rac-reports/:id/reviews
// @access  Private
const addReview = asyncHandler(async (req, res) => {
  const { reviewerId, role, review } = req.body;
  const racReportId = req.params.id;

  // Check if RAC report exists
  const racReport = await RacReport.findById(racReportId);
  if (!racReport) {
    res.status(404);
    throw new Error("RAC report not found");
  }

  // Create review
  const newReview = await Review.create({
    racReportId,
    reviewerId,
    role,
    review,
    date: new Date(),
  });

  if (newReview) {
    // Add review to RAC report
    racReport.reviews.push(newReview._id);
    await racReport.save();

    res.status(201).json(newReview);
  } else {
    res.status(400);
    throw new Error("Invalid review data");
  }
});

// @desc    Add a recommendation to a RAC report
// @route   POST /api/rac-reports/:id/recommendations
// @access  Private
const addRecommendation = asyncHandler(async (req, res) => {
  const { recommendation } = req.body;
  const racReportId = req.params.id;

  // Check if RAC report exists
  const racReport = await RacReport.findById(racReportId);
  if (!racReport) {
    res.status(404);
    throw new Error("RAC report not found");
  }

  // Create recommendation
  const newRecommendation = await Recommendation.create({
    racReportId,
    recommendation,
    date: new Date(),
  });

  if (newRecommendation) {
    // Add recommendation to RAC report
    racReport.recommendations.push(newRecommendation._id);
    await racReport.save();

    res.status(201).json(newRecommendation);
  } else {
    res.status(400);
    throw new Error("Invalid recommendation data");
  }
});

module.exports = {
  getRacReports,
  getRacReportById,
  createRacReport,
  updateRacReport,
  deleteRacReport,
  addReview,
  addRecommendation,
};
