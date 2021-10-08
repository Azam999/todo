const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: String,
  },
  {
    collection: "todos",
    versionKey: false,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
