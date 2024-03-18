const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    notice: {
      type: String,
      required: true,
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

const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = Notice;
