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
    const Notices = await Notice.find({ status: true });
    if (Notices.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "notice view succesfully ",
      Notices,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNotice = async (req, res, next) => {
  try {
    const noticeId = req.params.noticId;
    const deleteNotices = await Notice.findByIdAndUpdate(
      noticeId,
      { $set: { status: false } },
      { new: true });
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
    const {_id, notice}=req.body
    if (!_id) {
      return res.status(404).json({
        message: "Notice Id not found",
      });
    }
    const updatednotic = await Notice.findOneAndUpdate(
      { _id: req.body._id },
      {$set:{notice}},
      { new: true }
    );

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
