import express, { json, urlencoded } from "express";
import { db } from "./config/mongoose.js";
import * as config from "./config/config.js";
import { Todo } from "./models/todo.js";
import { User } from "./models/user.js";

config; //Brings the configuration code to this context.

const app = express();
app.disable("X-Powered-By");
app.use(json());
app.use(urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token, x-access-token"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.listen(3000, () => {
  console.log("Escuchando por el puerto", 3000);
  db();
});

app.post("/createTodo", async (req, res) => {
  try {
    const body = req.body;
    const todo = new Todo({
      title: body["title"],
      content: body["content"],
      date: body["date"],
      priority: body["priority"],
      username: body["username"],
    });
    await todo.save();
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
});

app.get("/getTodos/:name", async (req, res) => {
  try {
    const nameParam = req.params["name"];
    const todos = await Todo.find({ username: nameParam }).exec();
    return res.status(200).json({
      ok: true,
      todos,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
});

app.delete("/deleteTodo", async (req, res) => {
  try {
    const id = req.body["id"];
    await Todo.deleteOne({ _id: id });
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
});

app.put("/updateTodo", async (req, res) => {
  try {
    const body = req.body;
    await Todo.findOneAndUpdate(
      { _id: body["_id"] },
      {
        title: body["title"],
        content: body["content"],
        date: body["date"],
        priority: body["priority"],
      }
    );
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({
      username: body["username"],
      password: body["password"],
    }).exec();
    if (!user) {
      return res.status(400).json({
        ok: false,
        error,
      });
    } else {
      return res.status(200).json({
        ok: true,
        user,
      });
    }
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
});

app.post("/register", async (req, res) => {
  const body = req.body;
  try {
    const user = new User({
      username: body["username"],
      password: body["password"],
    });
    await user.save();
    return res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
    });
  }
});