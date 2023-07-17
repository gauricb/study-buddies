import express from "express";
import * as models from "../models.js";

export const app = express();

// CREATE A NEW TODO
app.post("/todo/create", async (req, res) => {
  const todo = await models.Todo.create(req.body);
  try {
    //for create op save to db like this
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET ALL TODOS
app.get("/todo/readAll", async (req, res) => {
  const todos = await models.Todo.find({});

  try {
    res.send(todos);
  } catch (error) {
    req.status(500).send(error);
  }
});

// GET A USER'S TODOS
app.get("/todo/readUser/:mongo_id", async (req, res) => {
  await models.Todo.find({ user: req.params.mongo_id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// UPDATE TODO
app.post("/todo/update/:mongoID", async (req, res) => {
  const mongo_id = req.params.mongoID;
  const newTodo = req.body;

  try {
    const updatedTodo = await models.Todo.findByIdAndUpdate(mongo_id, newTodo, {
      new: true,
    });
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/todo/delete/:mongoID", async (req, res) => {
  const mongo_id = req.params.mongoID;

  try {
    const deletedTodo = await models.Todo.findByIdAndDelete(mongo_id);
    if (deletedTodo) {
      res.send(deletedTodo);
    } else {
      res.status(404).send("Todo item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
