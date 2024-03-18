const mongoose = require("mongoose");

const visitorsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim:true,
      match: /^[a-zA-Z]/,
    },
    lastName: {
      type: String,
      required: true,
      trim:true,
      match: /^[a-zA-Z]/,
    },
    visitorFullName: {
      type: String,
      required: true,
    },
    Designation: {
      type: String,
      required: true,
    },
    visitorImage: {
      type: String,
      required: false,
    },
    reviewImage: {
      type: String,
      required: false,
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

const Visitors = mongoose.model("Visitor", visitorsSchema);

module.exports = Visitors;
