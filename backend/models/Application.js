import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  resume: {
    type: String, // Store file path or filename
    required: true,
  },
  coverLetter: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);

export default Application;

