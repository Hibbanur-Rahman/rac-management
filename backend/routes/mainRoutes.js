const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");

const Router = express.Router();

// User Routes
Router.post("/login", Login);


module.exports = Router;
