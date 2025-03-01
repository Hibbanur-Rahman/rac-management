const mongoose=require('mongoose');

const racReportSchema = new mongoose.Schema(
  {
    scholarId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Scholar',
    },
    racNumber: {
      type: Number,
      required: [true, 'Please add a RAC number'],
    },
    dateOfPresentation: {
      type: Date,
      required: [true, 'Please add a presentation date'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    recommendations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recommendation',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RacReport = mongoose.model('RacReport', racReportSchema);

module.exports= RacReport;