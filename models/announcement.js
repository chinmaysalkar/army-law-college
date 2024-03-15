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
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;
