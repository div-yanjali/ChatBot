const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  eligibility: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Scheme = mongoose.models.Scheme || mongoose.model("Scheme", schemeSchema);
module.exports = Scheme;
