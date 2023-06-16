import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String },
  content: { type: String },
  date: { type: String },
  priority: { type: String },
  username: { type: String },
});

todoSchema.plugin(uniqueValidator, {
  message: "El ID debe ser único",
});

export const Todo = mongoose.model("todo", todoSchema);
