const express = require("express");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

const mongoose = require("mongoose");

app.use(
  logger(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

if (process.env.isOCP) {
  mongoose
    .connect("mongodb://mongodb.mongo.svc:27017/mongo?replicaSet=rs0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: "mongouser",
      pass: "mongouser"
    })
    .then(() => {
      console.log("Mongo connected");
    })
    .catch(err => {
      console.log("Monoge error:");
      console.log(err);
    });
} else {
  console.log("Make sure you're pointing at the Master in Mongo!");
  mongoose
    .connect("mongodb://mongouser:mongouser@localhost:27017/mongo", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Mongo connected");
    })
    .catch(err => {
      console.log("Monoge error:");
      console.log(err);
    });
}

module.exports = app;
