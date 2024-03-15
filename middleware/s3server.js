const AWS = require("aws-sdk");

// Configure AWS SDK
AWS.config.update({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const s3 = new AWS.S3();

// Function to upload a file to S3
const uploadFileToS3 = async (files) => {
  try {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: files.originalname,
      Body: files.buffer,
    };

    const data = await s3.upload(uploadParams).promise();
    console.log("File uploaded successfully:", data.Location);
    return data.Location;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

// show all data in bucket
const listAllObjects = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  s3.listObjects(params, (err, data) => {
    if (err) {
      console.error("Error listing objects:", err);
      res.status(500).send("Error listing objects");
    } else {
      const objects = data.Contents.map((obj) => obj.Key);
      res.json(objects);
    }
  });
};

const deleteObject = async (req, res) => {
  const objectKey = req.params.objectKey;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: objectKey,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error("Error deleting object:", err);
      res.status(500).send("Error deleting object");
    } else {
      console.log("Object deleted successfully");
      res.send("Object deleted successfully");
    }
  });
};


module.exports = { uploadFileToS3, listAllObjects, deleteObject };
