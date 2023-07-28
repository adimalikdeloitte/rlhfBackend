// Rejection.js
const mongoose = require("mongoose");

const rejectionSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  podNumber: { type: Number, required: true },
  fileName: { type: String, required: true },
  rejectionReason: { type: String, required: true },
  annotatorEmail: { type: String, required: true },
  language: { type: String, required: true },
  task: { type: String, required: true },
});

const Rejection = mongoose.model("Rejection", rejectionSchema);

module.exports = Rejection;
