const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo.model");
const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.ATLAS_URI;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

/* GET home page. */
router.get("/todos", (req, res) => {
  Todo.find()
    .exec()
    .then((todos) => res.send(todos))
    .catch((err) => res.send(err));
});

router.post("/add/todo", (req, res) => {
  Todo.create(req.body, (err, todo) => {
    if (err) return console.error(err);
    return res.send(todo);
  });
});

router.delete("/delete/todo/:id", (req, res) => {
  Todo.findOneAndDelete(
    {
      _id: req.params.id,
    },
    (err, todo) => {
      if (err) return console.error(err);
      return res.send(todo);
    }
  );
});

router.put("/update/todo/:id", (req, res) => {
  Todo.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
      },
    },
    (err, updateTodo) => {
      if (err) return console.error(err);
      return res.send(updateTodo);
    }
  );
});

/**
 * Post info to react app from form using axios
 * Show todo on react app
 */

module.exports = router;
