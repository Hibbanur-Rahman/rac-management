const mongoose=require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    racReportId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'RacReport',
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Supervisor',
    },
    role: {
      type: String,
      enum: ['Supervisor', 'HOD Nominee', 'Supervisor Nominee'],
      required: true,
    },
    review: {
      type: String,
      required: [true, 'Please add a review'],
      maxlength: 1000,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports= Review;