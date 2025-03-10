const mongoose = require("mongoose");

const scholarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    rollNo: {
      type: String,
      required: false,
      maxlength: 15,
      unique: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfAdmission: {
      type: Date,
    },
    preSubmissionDate: {
      type: Date,
    },
    thesisSubmissionDate: {
      type: Date,
    },
    vivaVoceDate: {
      type: Date,
    },
    researchTopic: {
      type: String,
      maxlength: 150,
    },
    fullTime: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "On Leave", "Completed", "Discontinued"],
      default: "Active",
    },
    dateOfAward: {
      type: Date,
    },
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Supervisor",
    },
    hodNomineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supervisor",
    },
    supervisorNomineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supervisor",
    },
    role:{
      type:String,
      required:false
    }
  },
  {
    timestamps: true,
  }
);

const Scholar = mongoose.model("Scholar", scholarSchema);

module.exports = Scholar;
