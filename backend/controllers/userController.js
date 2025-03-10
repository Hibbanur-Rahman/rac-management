const asyncHandler = require("../utils/asyncHandler.js");

const User = require("../models/userModel.js");
const Scholar = require("../models/scholarModel.js");
const Supervisor = require("../models/supervisorModel.js");
const { getToken } = require("../middleware/authMiddleware.js");
const httpStatusCode = require("../constants/httpStatusCode.js");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    const token = await getToken(user);
    console.log("token:", token);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
    let roleUser;
    if (role === "scholar") {
      roleUser = await Scholar.create({
        userId: user._id,
        name: name,
        email: email,
        role: "scholar",
      });
    } else if (role === "supervisor") {
      roleUser = await Supervisor.create({
        userId: user._id,
        name: name,
        email: email,
        role: "supervisor",
      });
    } else if (role === "coordinator") {
      roleUser = await Supervisor.create({
        userId: user._id,
        name: name,
        email: email,
        role: "supervisor",
        isCoordinator: true,
      });
    }

    if (!roleUser) {
      res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Error creating user role",
      });
    }
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    const token = await getToken(user);
    console.log("token:", token);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    let profileData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // If user is a scholar, get scholar details
    if (user.role === "scholar") {
      const scholar = await Scholar.findOne({ userId: user._id }).populate(
        "supervisorId hodNomineeId supervisorNomineeId"
      );
      if (scholar) {
        profileData.scholarDetails = scholar;
      }
    }

    // If user is a supervisor, get supervisor details
    if (user.role === "supervisor") {
      const supervisor = await Supervisor.findOne({ userId: user._id });
      if (supervisor) {
        profileData.supervisorDetails = supervisor;
      }
    }

    res.json(profileData);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.active = req.body.active !== undefined ? req.body.active : user.active;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      active: updatedUser.active,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
