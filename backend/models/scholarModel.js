const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
    pinBilling: {
      pin: {
        type: String,
        required: false,
        unique: true, // Ensure the PIN is unique
      },
      duration: {
        type: String,
        required: false,
      },
      isUsed: {
        type: Boolean,
        required: false,
        default: false, // Default to false when created
      },
      createdTime: {
        type: Date,
        required: false,
        default: Date.now, // Default to the current timestamp
      },
    },
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],
    billing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Billing",
      },
    ],
    transaction:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      }
    ]
  },
  { timestamps: true }
);

// Generate a PIN before saving the user
UserSchema.pre("save", function (next) {
  if (!this.pinBilling.pin) {
    // Generate a 6-digit random PIN
    this.pinBilling.pin = Math.floor(100000 + Math.random() * 900000).toString();
  }
  next();
});

// Validate the PIN length
UserSchema.path("pinBilling.pin").validate(function (value) {
  return value && value.length === 6; // Ensure the PIN is exactly 6 digits
}, "PIN must be 6 digits long.");

// Remove sensitive data from the JSON response
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  // delete obj.pinBilling;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);