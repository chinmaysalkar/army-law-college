const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});
//upload image
const Image = upload.fields([
  { name: "visitorImage", maxCount: 1 },
  { name: "reviewImage", maxCount: 1 },
  { name: "studentImages", maxCount: 1 },
  { name: "coverImages", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
  { name: "eventImages", maxCount: 15 },
]);
module.exports = Image;
