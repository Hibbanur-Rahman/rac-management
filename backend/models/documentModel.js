const mongoose=require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a document name'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please add a document type'],
      enum: ['proposal', 'report', 'thesis', 'minutes', 'other'],
    },
    scholarId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Scholar',
    },
    uploadedById: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    filePath: {
      type: String,
      required: [true, 'Please add a file path'],
    },
    fileSize: {
      type: String,
      required: [true, 'Please add a file size'],
    },
    description: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentSchema);
module.exports= Document;