const Notice = require("../models/noticeSchema");

const addNotice = async (req, res, next) => {
  try {
    const newNotic = new Notice(req.body);
    const notice = await newNotic.save();
    res.status(200).json({
      message: "notice added succesfully ",
      notice,
    });
  } catch (error) {
    next(error);
  }
};

const viewNotice = async (req, res, next) => {
  try {
    const Notices = await Notice.find();
    if (Notices.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "notice added succesfully ",
      Notices,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNotice = async (req, res, next) => {
  try {
    const noticeId = req.params.noticId;
    const deleteNotices = await Notice.findByIdAndDelete(noticeId);
    if (!deleteNotices) {
      res.status(404).json({
        message: " notice not found to delete",
      });
    }
    res.status(200).json({
      message: "notice deleted  succesfully ",
      deleteNotices,
    });
  } catch (error) {
    next(error);
  }
};
const updateNotice = async (req, res, next) => {
  try {
    const updatednotic = await Notice.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    if (!updatednotic) {
      return res.status(404).json({
        message: "Notice Id not found",
      });
    }
    await updatednotic.save();
    res.status(200).json({
      message: "Notice data  updated successfully",
      updatednotic,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addNotice,
  viewNotice,
  deleteNotice,
  updateNotice,
};
