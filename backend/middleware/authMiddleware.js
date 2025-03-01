const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secretKey = 'Rahman@1234';
const httpStatusCode = require("../constants/httpStatusCode");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
async function getToken(user) {
  const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(httpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Token not provided" });
  }

  try {
    // Split the authorization header by space and directly use the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user);
    // console.log("token:", token);
    // console.log("secreate key:",process.env.JWT_SECRET)
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(httpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
}

// Protect routes middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

// Check role middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(401);
      throw new Error(
        `Role: ${req.user.role} is not authorized to access this resource`
      );
    }
  };
};

module.exports = {
  getToken,
  verifyToken,
  protect,
  admin,
  checkRole,
};
