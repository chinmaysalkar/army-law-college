const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
const errorMiddleware = require("./middleware/errorHandler");
const eventRoute = require("./routes/eventRoute");
const port = process.env.PORT || 5000;

//database connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("database is connected"))
  .catch((error) => console.log(error));

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/event", eventRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Army Law College server is running ");
});
app.all("*", (req, res) => {
  res.status(404).json({
    success: "fail",
    message: `can not find the server : ${req.originalUrl}`,
  });
});
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("server is running ....");
});
