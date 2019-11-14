require("dotenv").config();

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
    .connect(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongodb:27017/mongo?replicaSet=rs0`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
      }
    )
    .then(() => {
      console.log("Mongo connected");
    })
    .catch(err => {
      console.log("Mongo error:");
      console.log(err);
    });
} else {
  console.log("Make sure you're pointing at the Master in Mongo!");
  mongoose
    .connect(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo-external-mongo.192.168.1.45.nip.io:32463/mongo`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
      }
    )
    .then(() => {
      console.log("Mongo connected");
    })
    .catch(err => {
      console.log("Mongo error:");
      console.log(err);
    });
}

module.exports = app;
