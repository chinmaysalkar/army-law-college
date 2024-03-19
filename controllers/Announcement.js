const Announcement = require("../models/announcement.js");

const addAnnouncement = async (req, res, next) => {
  try {
    const { announcementTitle, announcementLinks } = req.body;
    const announce = new Announcement({ announcementTitle, announcementLinks });
    const newAnnounce = await announce.save();
    res.status(200).json({
      message: "announcement added succesfully ",
      newAnnounce,
    });
  } catch (error) {
    next(error);
  }
};

const viewAnnouncement = async (req, res, next) => {
  try {
    const viewAnnounce = await Announcement.find({ status: true });
    if (viewAnnounce.length === 0) {
      return res.status(404).json({ message: "No data found" });
      
    }
    res.status(200).json({
      message: "announcement shown succesfully",
      viewAnnounce,
    });
  } catch (error) {
    next(error);
  }
};
const deleteAnnounce = async (req, res, next) => {
  try {
    const deleteAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,   
       { $set: { status: false } },
      { new: true });
    
    if (!deleteAnnouncement) {
      res.status(404).json({ message: " could not found announcement" });
    }
    res.status(200).json({
      message: " Announcement deleted succesfully",
      deleteAnnouncement,
    });
  } catch (error) {
    next(error);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const { _id, announcementTitle, announcementLinks } = req.body;

    if (!_id) {
      return res.status(404).json({
        message: "Announcement Id not found",
      });
    }
    const updatedAnnounce = await Announcement.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { announcementTitle, announcementLinks } },
      { new: true }
    );

    await updatedAnnounce.save();
    res.status(200).json({
      message: "Announcement data  updated successfully",
      updatedAnnounce,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  viewAnnouncement,
  addAnnouncement,
  deleteAnnounce,
  updateAnnouncement,
};
