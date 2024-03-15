const Event = require("../models/eventsSchema");
const path = require("path");
const { uploadFileToS3 } = require("../middleware/s3server");

const addEvent = async (req, res, next) => {
  try {
    const { eventName, eventDetails, eventSession } = req.body;
    // const eventImages = req.files.eventImages;
    // const coverImages = req.files.coverImages[0];

    // //upload image to s3 bucket
    // const coverImagesUrl = await uploadFileToS3(coverImages);
    // const eventImagesUrls = await Promise.all(
    //   eventImages.map(async (image) => {
    //     return await uploadFileToS3(image);
    //   })
    // );

    const uniqueId = `EVT-${Math.floor(Math.random() * 8889) + 1111}`;
    const event = new Event({
      eventId: uniqueId,
      eventName,
      eventDetails,
      eventSession,
      // coverImages: coverImagesUrl,
      // eventImages: eventImagesUrls,
    });

    const eventadded = await event.save();
    res.status(200).json({
      message: " event added succesfully",
      eventadded,
    });
  } catch (error) {
    next(error);
  }
};

const viewEvents = async (req, res, next) => {
  try {
    const viewEvent = await Event.find({ status: true });
    if (viewEvent.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "all event  view succesfully",
      viewEvent,
    });
  } catch (error) {
    next(error);
  }
};

const viewEventsByYear = async (req, res, next) => {
  try {
    const eventView = await Event.find({
      eventYear: req.params.year,
      status: true,
    }).select("eventName eventImages");
    if (eventView.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "all event  view succesfully",
      eventView,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const deleteevent = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $set: { status: false } },
      { new: true }
    );
    if (!deleteevent) {
      res.status(404).json({ message: " could not found the event Id" });
    }
    res.status(200).json({
      message: " event deleted succesfully",
      deleteevent,
    });
  } catch (error) {
    next(error);
  }
};

const updateEvents = async (req, res, next) => {
  try {
    const { _id, eventName, eventDetails, eventSession } = req.body;
    if (!_id) {
      return res.status(404).json({
        message: "Event Id not found",
      });
    }
    const updatedevents = await Event.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { eventName, eventDetails, eventSession } },
      { new: true }
    );

    res.status(200).json({
      message: "Event Data updated successfully",
      updatedevents,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEvent,
  viewEvents,
  viewEventsByYear,
  deleteEvent,
  updateEvents,
};
