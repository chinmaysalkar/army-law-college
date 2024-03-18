const Student = require("../models/studentSchema");
const path = require("path");
const { uploadFileToS3 } = require("../middleware/s3server");

const addStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, description } = req.body;
    const studentImages = req.files.studentImages[0];
    //upload image to s3 bucket
    const studentImagesUrl = await uploadFileToS3(studentImages);

    const student = new Student({
      studentFullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      description,
      studentImages: studentImagesUrl,
    });
    const saveStudent = await student.save();
    res.status(200).json({
      message: "Student added successfully",
      saveStudent,
    });
  } catch (error) {
    next(error);
  }
};
const viewStudent = async (req, res, next) => {
  try {
    const studentView = await Student.find({ status: true });
    if (studentView.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "student view succesfully",
      studentView,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const deletestudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $set: { status: false } },
      { new: true }
    );
    if (!deletestudent) {
      res
        .status(404)
        .json({ message: " could not found the student of this Id" });
    }
    res.status(200).json({
      message: " student deleted succesfully",
      deletestudent,
    });
  } catch (error) {
    next(error);
  }
};
const updateStudent = async (req, res, next) => {
  try {
    const { _id, firstName, lastName, description } = req.body;

    if (!_id) {
      return res.status(404).json({
        message: "Student Id not found",
      });
    }
    if (req.file) {
      const fileUrl = await uploadToS3(req.file);

      req.body.studentImages = fileUrl;
    }
    const updatedstudent = await Student.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          studentFullName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          description,
        },
      },
      { new: true }
    );

    await updatedstudent.save();
    res.status(200).json({
      message: "Student data  updated successfully",
      updatedstudent,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addStudent,
  deleteStudent,
  viewStudent,
  updateStudent,
};
