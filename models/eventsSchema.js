const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
    },
    eventName: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s]+$/,
    },
    eventDetails: {
      type: String,
      required: false,
    },
    eventSession: {
      type: String,
      required: true,
      match: /^[0-9]{4}-[0-9]{2}$/,
    },
    eventImages: [
      {
        type: String,
        required: false,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    coverImages: { type: String },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
