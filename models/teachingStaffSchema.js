const mongoose = require("mongoose");
const validator = require("validator");

const teachingStaffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      match: /^[a-zA-Z]+$/,
    },
    lastName: {
      type: String,
      required: true,
      match: /^[a-zA-Z]+$/,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: validator.isEmail,
    },
    profilePic: {
      type: String,
    },
    qualification: {
      type: String,
      required: false,
      match: /^[a-zA-Z]+$/
    },
    designation: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
    },
    researchAndPublications: {
      type: [String],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    
  }
);

const TeachingStaff = mongoose.model("TeachingStaff", teachingStaffSchema);
module.exports = TeachingStaff;
