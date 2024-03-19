const express = require("express");
const router = express.Router();

const Image = require("../middleware/multer");
const {
  addAnnouncement,
  viewAnnouncement,
  deleteAnnounce,
  updateAnnouncement,
} = require("../controllers/Announcement");
const {
  addStudent,
  viewStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student");
const {
  addVisitor,
  viewVisitor,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitor");
const {
  addEvent,
  viewEvents,
  viewEventsByYear,
  deleteEvent,
  updateEvents,
} = require("../controllers/eventController");
const {
  addTeachingStaff,
  viewTeachingStaff,
  updateTeachingStaff,
  deleteTeachingStaff,
} = require("../controllers/teachingStaff");
const { listAllObjects, deleteObject } = require("../middleware/s3server");
const {
  addNotice,
  viewNotice,
  deleteNotice,
  updateNotice,
} = require("../controllers/notice");

//Events
router.post("/addEvent", Image, addEvent);
router.get("/viewEvents", viewEvents);
router.get("/viewEventsByYear/:year", viewEventsByYear);
router.delete("/deleteEvent/:eventId", deleteEvent);
router.put("/updateEvent", updateEvents);

//Announcement
router.post("/addAnnouncement", addAnnouncement);
router.get("/viewAnnouncement", viewAnnouncement);
router.delete("/deleteAnnounce/:id", deleteAnnounce);
router.put("/updatedAnnounce", updateAnnouncement);

// Notification
router.post("/addNotice", addNotice);
router.get("/viewNotice", viewNotice);
router.delete("/deleteNotic/:noticId", deleteNotice);
router.put("/updateNotice", updateNotice);

//Student
router.post("/addStudent", Image, addStudent);
router.get("/viewStudent", viewStudent);
router.put("/updatedStudent", updateStudent);
router.delete("/deleteStudent/:studentId", deleteStudent);

//Visitors
router.post("/addVisitor", Image, addVisitor);
router.get("/viewVisitor", viewVisitor);
router.put("/updatedvisitor", updateVisitor);
router.delete("/deletevisitor/:visitorId", deleteVisitor);

//teaching Staff
router.post("/addteachingStaff", Image, addTeachingStaff);
router.get("/viewTeachingStaff", viewTeachingStaff);
router.put("/updatedStaff", updateTeachingStaff);
router.delete("/deleteTeachingStaff/:staffId", deleteTeachingStaff);

router.get("/files", listAllObjects);
router.delete("/deleteObject/:objectKey", deleteObject);

module.exports = router;
