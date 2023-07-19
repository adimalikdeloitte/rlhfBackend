// Record.js
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  podNumber: { type: Number, required: true },
  fileName: { type: String, required: true },
  annotatorEmail: { type: String, required: true },
  errorPercentage: { type: Number, required: true },
  language: { type: String, required: true },
  totalTimeTaken: { type: Number, required: true },
  task: { type: String, required: true },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
