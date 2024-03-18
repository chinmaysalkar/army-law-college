const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    announcementTitle: {
      type: String,
      required: true,
    },
    announcementLinks: {
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

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;
