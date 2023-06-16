import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

userSchema.plugin(uniqueValidator, {
  message: "El ID debe ser único",
});

export const User = mongoose.model("user", userSchema);
