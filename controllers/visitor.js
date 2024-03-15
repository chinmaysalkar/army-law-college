const Visitor = require("../models/visitorsSchema");
const path = require("path");

const { uploadFileToS3 } = require("../middleware/s3server");
const addVisitor = async (req, res, next) => {
  try {
    const { firstName, lastName, Designation } = req.body;

    // const reviewImage = req.files.reviewImage[0];
    // const visitorImage = req.files.visitorImage[0];

    // //upload image to s3 bucket
    // const visitorImageUrl = await uploadFileToS3(visitorImage);
    // const reviewImageUrl = await uploadFileToS3(reviewImage);

    const visitor = new Visitor({
      visitorFullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      Designation,
      // visitorImage: visitorImageUrl,
      // reviewImage: reviewImageUrl,
    });
    const saveVisitor = await visitor.save();
    res.status(200).json({
      message: "visitor added succesfully",
      saveVisitor,
    });
  } catch (error) {
    next(error);
  }
};

const viewVisitor = async (req, res, next) => {
  try {
    const visitorView = await Visitor.find();
    if (visitorView.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "visitor viewed succesfully",

      visitorView,
    });
  } catch (error) {
    next(error);
  }
};

const updateVisitor = async (req, res, next) => {
  try {
    const { _id, firstName, lastName, Designation } = req.body;
    if (!_id) {
      return res.status(404).json({
        message: "visitor Id not found",
      });
    }
    const updatedvisitor = await Visitor.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          visitorFullName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          Designation,
        },
      },
      { new: true }
    );

    await updatedvisitor.save();
    res.status(200).json({
      message: "visitor Data updated successfully",
      updatedvisitor,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVisitor = async (req, res, next) => {
  try {
    const visitorId = req.params.visitorId;
    const deletevisitor = await Visitor.findByIdAndUpdate(
      visitorId,
      { $set: { status: false } },
      { new: true }
    );
    if (!deletevisitor) {
      res
        .status(404)
        .json({ message: " could not found the visitor of this Id" });
    }
    res.status(200).json({
      message: " visitor  deleted succesfully",
      deletevisitor,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  viewVisitor,
  addVisitor,
  updateVisitor,
  deleteVisitor,
};
