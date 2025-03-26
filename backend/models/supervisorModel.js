const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    salutation: {
      type: String,
      required: false,
      maxlength: 10,
    },
    name: {
      type: String,
      required: false,
      maxlength: 50,
    },
    designation: {
      type: String,
      required: false,
      maxlength: 15,
    },
    department: {
      type: String,
      required: false,
      maxlength: 35,
    },
    university: {
      type: String,
      maxlength: 75,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
    },
    specialization: {
      type: String,
    },
    isCoordinator:{
      type:Boolean,
      default:false
    },
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

module.exports = Supervisor;
