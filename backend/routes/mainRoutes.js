const express = require("express");
const app = express();

const { verifyToken } = require("../middleware/authMiddleware");
const userRoutes = require("./userRoutes.js");
const scholarRoutes = require("./scholarRoutes.js");
const supervisorRoutes = require("./supervisorRoutes.js");
const racReportRoutes = require("./racReportRoutes.js");
const documentRoutes = require("./documentRoutes.js");
const meetingRoutes = require("./meetingRoutes.js");
const { getCoordinator } = require("../controllers/supervisorController.js");
const Router = express.Router();

Router.use("/api/users", userRoutes);
Router.use("/scholars", scholarRoutes);
Router.use("/supervisors", supervisorRoutes);
Router.use("/rac-reports", racReportRoutes);
Router.use("/documents", documentRoutes);
Router.use("/meetings", meetingRoutes);
Router.get("/coordinator", verifyToken, getCoordinator);

module.exports = Router;
