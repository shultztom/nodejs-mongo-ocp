const express = require("express");
const router = express.Router();

// Add Models
const Dog = require("../models/dog");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.status(200).json({
    msg: "Node.js and Mongodb replica set on OCP"
  });
});

/* GET dogs page. */
router.get("/dogs", async function(req, res, next) {
  let dogs = await Dog.find();
  res.status(200).json({
    dogs
  });
});

// Add dog by param
router.post("/dogs", async function(req, res, next) {
  let { name } = req.body;
  let newDog = new Dog({ name: name });
  let dog = await newDog.save();
  res.status(200).json({
    dog
  });
});

module.exports = router;
