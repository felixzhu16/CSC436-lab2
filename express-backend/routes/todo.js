const express = require("express");
const jwt = require("jsonwebtoken");
const ToDo = require("../models/ToDo");

const privateKey = process.env.JWT_PRIVATE_KEY;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the error
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const todo = new ToDo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    complete: req.body.complete,
    dateCreated: req.body.dateCreated
  });
  return todo
    .save()
    .then((savedToDo) => {
      return res.status(201).json({
        _id: savedToDo._id,
        title: savedToDo.title,
        description: savedToDo.description,
        author: savedToDo.author,
        complete: savedToDo.complete,
        dateCreated: savedToDo.dateCreated
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Something went wrong." });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await ToDo.find().where("author").equals(req.payload.id).exec();
  // const todos = await ToDo.find().exec();  
  return res.status(200).json(todos);
});

router.delete("/delete/:id", async function (req, res, next){
  const todo = await ToDo.findOneAndDelete().where("_id").equals(req.params.id).exec();
  console.log(todo);
  console.log(req.params.id)
  return res.status(200).json(todo)
});

router.patch("/complete/:id", async function (req, res, next){
  const todo = await ToDo.findOneAndUpdate().where("_id").equals(req.params.id).exec();
  console.log(todo);
  return res.status(200).json(todo)
});

module.exports = router;