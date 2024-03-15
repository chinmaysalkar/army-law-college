const TeachingStaff = require("../models/teachingStaffSchema");
// const { uploadFileToS3 } = require("../middleware/s3server");

const addTeachingStaff = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      qualification,
      designation,
      biography,
      researchAndPublications,
    } = req.body;
    // const profilePic = req.files.profilePic[0];
    // const profilePicUrl = await uploadFileToS3(profilePic);
    const teachingStaff = new TeachingStaff({
      fullName: `${firstName} ${lastName}`,
      // profilePic: profilePicUrl,
      firstName,
      lastName,
      email,
      qualification,
      designation,
      biography,
      researchAndPublications,
    });
    const staff = await teachingStaff.save();
    res.status(200).json({
      message: " teaching staff profile created succesfully ",
      staff,
    });
  } catch (error) {
    next(error);
  }
};

const viewTeachingStaff = async (req, res, next) => {
  try {
    const StaffView = await TeachingStaff.find();
    if (StaffView.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({
      message: "teaching staff  viewed succesfully",
      StaffView,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeachingStaff = async (req, res, next) => {
  try {
    const staffId = req.params.staffId;
    const deleteStaff = await TeachingStaff.findByIdAndUpdate(
      staffId,
      { $set: { status: false } },
      { new: true }
    );
    if (!deleteStaff) {
      res
        .status(404)
        .json({ message: " could not found the teaching staff Id" });
    }
    res.status(200).json({
      message: " teaching staff deleted succesfully",
      deleteStaff,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeachingStaff = async (req, res, next) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      qualification,
      designation,
      biography,
      researchAndPublications,
    } = req.body;

    if (!_id) {
      return res.status(404).json({
        message: "teaching staff Id not found",
      });
    }
    if (req.file) {
      const fileUrl = await uploadToS3(req.file);

      req.body.profilePic = fileUrl;
    }
    const updatedStaff = await TeachingStaff.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: {
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
          email,
          qualification,
          designation,
          biography,
          researchAndPublications,
        },
      },

      { new: true }
    );

    await updatedStaff.save();
    res.status(200).json({
      message: "teaching staff Data updated successfully",
      updatedStaff,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addTeachingStaff,
  viewTeachingStaff,
  updateTeachingStaff,
  deleteTeachingStaff,
};
