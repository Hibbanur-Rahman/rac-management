const mongoose=require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a meeting title'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please add a meeting type'],
      enum: ['RAC Review', 'Progress Review', 'Proposal Defense', 'Thesis Defense', 'Other'],
    },
    scholarId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Scholar',
    },
    date: {
      type: Date,
      required: [true, 'Please add a meeting date'],
    },
    time: {
      type: String,
      required: [true, 'Please add a meeting time'],
    },
    duration: {
      type: String,
      required: [true, 'Please add a meeting duration'],
    },
    location: {
      type: String,
      required: [true, 'Please add a meeting location'],
    },
    description: {
      type: String,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports= Meeting;