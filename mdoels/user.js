const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("hashed_password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.hashed_password = await bcrypt.hash(this.hashed_password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;