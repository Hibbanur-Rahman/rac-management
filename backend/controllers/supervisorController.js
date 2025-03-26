const asyncHandler = require("../utils/asyncHandler.js");
const Supervisor = require("../models/supervisorModel.js");
const Scholar = require("../models/scholarModel.js");
const User = require("../models/userModel.js");
const httpStatusCode = require("../constants/httpStatusCode.js");

// @desc    Get all supervisors
// @route   GET /api/supervisors
// @access  Private
const getSupervisors = asyncHandler(async (req, res) => {
  try {
    const Supervisors = await Supervisor.find({});
    if (!Supervisors) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "No supervisors found",
      });
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      data: Supervisors,
      message: "Supervisor found successfully!",
    });
  } catch (error) {
    console.log("error while getting the supervisor:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong ",
      error: error.message || "something went wrong",
    });
  }
});

// @desc    Get supervisor by ID
// @route   GET /api/supervisors/:id
// @access  Private
const getSupervisorById = asyncHandler(async (req, res) => {
  const supervisor = await Supervisor.findById(req.params.id);

  if (supervisor) {
    res.json(supervisor);
  } else {
    res.status(404);
    throw new Error("Supervisor not found");
  }
});

// @desc    Create a supervisor
// @route   POST /api/supervisors
// @access  Private/Admin
const createSupervisor = asyncHandler(async (req, res) => {
  const {
    salutation,
    name,
    designation,
    department,
    university,
    email,
    phone,
    specialization,
    userId,
  } = req.body;

  // Create supervisor
  const supervisor = await Supervisor.create({
    salutation,
    name,
    designation,
    department,
    university,
    email,
    phone,
    specialization,
    userId,
  });

  if (supervisor) {
    res.status(201).json(supervisor);
  } else {
    res.status(400);
    throw new Error("Invalid supervisor data");
  }
});

// @desc    Update a supervisor
// @route   PUT /api/supervisors/:id
// @access  Private/Admin
const updateSupervisor = asyncHandler(async (req, res) => {
  const supervisor = await Supervisor.findById(req.params.id);

  if (supervisor) {
    supervisor.salutation = req.body.salutation || supervisor.salutation;
    supervisor.name = req.body.name || supervisor.name;
    supervisor.designation = req.body.designation || supervisor.designation;
    supervisor.department = req.body.department || supervisor.department;
    supervisor.university = req.body.university || supervisor.university;
    supervisor.email = req.body.email || supervisor.email;
    supervisor.phone = req.body.phone || supervisor.phone;
    supervisor.specialization =
      req.body.specialization || supervisor.specialization;

    const updatedSupervisor = await supervisor.save();
    res.json(updatedSupervisor);
  } else {
    res.status(404);
    throw new Error("Supervisor not found");
  }
});

// @desc    Delete a supervisor
// @route   DELETE /api/supervisors/:id
// @access  Private/Admin
const deleteSupervisor = asyncHandler(async (req, res) => {
  const supervisor = await Supervisor.findById(req.params.id);

  if (supervisor) {
    await supervisor.deleteOne();
    res.json({ message: "Supervisor removed" });
  } else {
    res.status(404);
    throw new Error("Supervisor not found");
  }
});

// @desc    Get supervisor's scholars
// @route   GET /api/supervisors/:id/scholars
// @access  Private
const getSupervisorScholars = asyncHandler(async (req, res) => {
  const supervisorId = req.params.id;

  const scholars = await Scholar.find({ supervisorId })
    .populate("supervisorId", "salutation name")
    .populate("hodNomineeId", "salutation name")
    .populate("supervisorNomineeId", "salutation name");

  res.json(scholars);
});

// @desc    Get supervisor's committee memberships
// @route   GET /api/supervisors/:id/committees
// @access  Private
const getSupervisorCommittees = asyncHandler(async (req, res) => {
  const supervisorId = req.params.id;

  // Find scholars where the supervisor is either the main supervisor, HOD nominee, or supervisor nominee
  const committees = await Scholar.find({
    $or: [
      { supervisorId: supervisorId },
      { hodNomineeId: supervisorId },
      { supervisorNomineeId: supervisorId },
    ],
  }).select("name rollNo researchTopic status");

  // Format the response to include the role
  const formattedCommittees = committees.map((scholar) => {
    let role = "";
    if (scholar.supervisorId.toString() === supervisorId) {
      role = "Supervisor";
    } else if (
      scholar.hodNomineeId &&
      scholar.hodNomineeId.toString() === supervisorId
    ) {
      role = "HOD Nominee";
    } else if (
      scholar.supervisorNomineeId &&
      scholar.supervisorNomineeId.toString() === supervisorId
    ) {
      role = "Supervisor Nominee";
    }

    return {
      scholarId: scholar._id,
      scholarName: scholar.name,
      rollNo: scholar.rollNo,
      researchTopic: scholar.researchTopic,
      status: scholar.status,
      role: role,
    };
  });

  res.json(formattedCommittees);
});

const getCoordinator = asyncHandler(async (req, res) => {
  try {
    const Coordinator = await Supervisor.find({ isCoordinator: true });
    if (!Coordinator) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "No Coordinator Found",
      });
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Coordinator Found",
      data: Coordinator,
    });
  } catch (error) {
    console.log("error while getting coordinator", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting coordinator",
      error: error.message || "something went wrong",
    });
  }
});

module.exports = {
  getSupervisors,
  getSupervisorById,
  createSupervisor,
  updateSupervisor,
  deleteSupervisor,
  getSupervisorScholars,
  getSupervisorCommittees,
  getCoordinator
};
