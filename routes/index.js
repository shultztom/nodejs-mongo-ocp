const express = require("express");
const router = express.Router();

// Add Models
const Dog = require("../models/dog");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.status(200).json({
    msg: "Node.js and Mongodb replica set on OCP, checkout /dogs to use Mongo"
  });
});

/* GET dogs page. */
router.get("/dogs", async function(req, res, next) {
  let dogs;
  try {
    dogs = await Dog.find();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    dogs
  });
});

//* POST dogs page. */
router.post("/dogs", async function(req, res, next) {
  let { name } = req.body;
  let newDog = new Dog({ name: name });
  let dog;
  try {
    dog = await newDog.save();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    dog
  });
});

module.exports = router;
