import express from "express";
import * as models from "../models.js";

export const app = express();

// GET ALL DEADLINE ITEMS
app.get("/deadline/readUser/:mongo_id", async (req, res) => {
  await models.Deadline.find({ user: req.params.mongo_id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// CREATE A DEADLINE ITEM
app.post("/deadline/create", async (req, res) => {
  const deadline = await models.Deadline.create(req.body);

  try {
    //for create op save to db like this
    await deadline.save();
    res.send(deadline);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET ALL TODOS
app.get("/deadline/readAll", async (req, res) => {
  const todos = await models.Deadline.find({});

  try {
    res.send(todos);
  } catch (error) {
    req.status(500).send(error);
  }
});

app.get("/deadline/getOne/:day", async (req, res) => {
  const deadline = await models.Deadline.find({ day: req.params.day });
  try {
    res.send(deadline);
  } catch {
    res.status(500).send(error);
  }
});

// UPDATE CALENDAR
app.post("/deadline/update/:mongoID", async (req, res) => {
  const mongo_id = req.params.mongoID;
  const newDeadline = req.body;

  try {
    const updatedDeadline = await models.Deadline.findByIdAndUpdate(
      mongo_id,
      newDeadline,
      {
        new: true,
      }
    );
    res.send(updatedDeadline);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/deadline/delete/:mongoID", async (req, res) => {
  const mongo_id = req.params.mongoID;

  try {
    const deletedDeadline = await models.Deadline.findByIdAndDelete(mongo_id);
    if (deletedDeadline) {
      res.send(deletedDeadline);
    } else {
      res.status(404).send("Deadline item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
