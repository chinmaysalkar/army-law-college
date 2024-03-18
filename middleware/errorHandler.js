const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: 500,
    success: false,
    message: " Internal server error",
  };

  // validation error
  if (err.name == "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = err.message.split(": ")[2];
  }

  // duplicate error handling
  if (err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(err.keyValue)} field must be unique`;
  }

  //multer error
  if (err.name === "MulterError") {
    defaultError.statusCode = 400;
    defaultError.message = `File upload error : ${err.message.split(": ")}`;
  }

  // CORS error
  if(err.name==="CORSError"){
    defaultError.statusCode=403;
    defaultError.message=` CORS Error : ${err.message}`
  }
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};
module.exports = errorMiddleware;
