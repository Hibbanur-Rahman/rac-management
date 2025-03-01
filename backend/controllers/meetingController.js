const asyncHandler = require("../utils/asyncHandler.js");
const Meeting = require("../models/meetingModel.js");
const Scholar = require("../models/scholarModel.js");

// @desc    Get all meetings
// @route   GET /api/meetings
// @access  Private
const getMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find({})
    .populate("scholarId", "name rollNo")
    .populate("attendees", "name");

  res.json(meetings);
});

// @desc    Get meeting by ID
// @route   GET /api/meetings/:id
// @access  Private
const getMeetingById = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id)
    .populate("scholarId", "name rollNo")
    .populate("attendees", "name");

  if (meeting) {
    res.json(meeting);
  } else {
    res.status(404);
    throw new Error("Meeting not found");
  }
});

// @desc    Create a meeting
// @route   POST /api/meetings
// @access  Private
const createMeeting = asyncHandler(async (req, res) => {
  const {
    title,
    type,
    scholarId,
    date,
    time,
    duration,
    location,
    description,
    attendees,
  } = req.body;

  // Check if scholar exists
  const scholar = await Scholar.findById(scholarId);
  if (!scholar) {
    res.status(404);
    throw new Error("Scholar not found");
  }

  // Create meeting
  const meeting = await Meeting.create({
    title,
    type,
    scholarId,
    date,
    time,
    duration,
    location,
    description,
    attendees: attendees || [],
    status: "Scheduled",
  });

  if (meeting) {
    res.status(201).json(meeting);
  } else {
    res.status(400);
    throw new Error("Invalid meeting data");
  }
});

// @desc    Update a meeting
// @route   PUT /api/meetings/:id
// @access  Private
const updateMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);

  if (meeting) {
    meeting.title = req.body.title || meeting.title;
    meeting.type = req.body.type || meeting.type;
    meeting.date = req.body.date || meeting.date;
    meeting.time = req.body.time || meeting.time;
    meeting.duration = req.body.duration || meeting.duration;
    meeting.location = req.body.location || meeting.location;
    meeting.description = req.body.description || meeting.description;
    meeting.attendees = req.body.attendees || meeting.attendees;
    meeting.status = req.body.status || meeting.status;

    const updatedMeeting = await meeting.save();
    res.json(updatedMeeting);
  } else {
    res.status(404);
    throw new Error("Meeting not found");
  }
});

// @desc    Delete a meeting
// @route   DELETE /api/meetings/:id
// @access  Private
const deleteMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);

  if (meeting) {
    await meeting.deleteOne();
    res.json({ message: "Meeting removed" });
  } else {
    res.status(404);
    throw new Error("Meeting not found");
  }
});

// @desc    Get upcoming meetings
// @route   GET /api/meetings/upcoming
// @access  Private
const getUpcomingMeetings = asyncHandler(async (req, res) => {
  const currentDate = new Date();

  const meetings = await Meeting.find({
    date: { $gte: currentDate },
    status: "Scheduled",
  })
    .populate("scholarId", "name rollNo")
    .populate("attendees", "name")
    .sort({ date: 1, time: 1 });

  res.json(meetings);
});

// @desc    Get meetings by date
// @route   GET /api/meetings/date/:date
// @access  Private
const getMeetingsByDate = asyncHandler(async (req, res) => {
  const dateParam = req.params.date; // Format: YYYY-MM-DD

  // Create date range for the specified date (start of day to end of day)
  const startDate = new Date(dateParam);
  const endDate = new Date(dateParam);
  endDate.setHours(23, 59, 59, 999);

  const meetings = await Meeting.find({
    date: { $gte: startDate, $lte: endDate },
  })
    .populate("scholarId", "name rollNo")
    .populate("attendees", "name")
    .sort({ time: 1 });

  res.json(meetings);
});

module.exports = {
  getMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getUpcomingMeetings,
  getMeetingsByDate,
};
