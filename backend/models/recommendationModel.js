const mongoose=require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    racReportId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'RacReport',
    },
    recommendation: {
      type: String,
      required: [true, 'Please add a recommendation'],
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

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports= Recommendation;