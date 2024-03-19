const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      
      match: /^[a-zA-Z]+$/,
    },
    lastName: {
      type: String,
      required: false,
      
      match: /^[a-zA-Z]+$/,
    },
    studentFullName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    studentImages: {
      type: String,
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

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
