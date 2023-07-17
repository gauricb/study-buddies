import express from "express";
import * as models from "../models.js";

export const app = express();

// GET ALL CALENDAR ITEMS
app.get("/calendar/readAll", async (req, res) => {
  const calendar_items = await models.Calendar.find({});

  try {
    res.send(calendar_items);
  } catch {
    res.status(500).send(error);
  }
});

// GET ALL OF A GIVEN USER'S CALENDER ITEMS
app.get("/calendar/readUser/:user_id", async (req, res) => {
  await models.Calendar.find({user: req.params.user_id}).then(data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(500).send(error);
  });
});

// GET ALL OF A USER'S CALENDAR ITEMS ON A GIVEN DAY
app.get("/calendar/readUserDay/:user_id/:day", async (req, res) => {
  await models.Calendar.find({user: req.params.user_id, days: req.params.day}).then(data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(500).send(error);
  });
});

// GET AN EVENT GIVEN ITS MONGO ID
app.get("/calendar/readEvent/:mongo_id", async (req, res) => {
  await models.Calendar.findOne({_id: req.params.mongo_id}).then(data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(500).send(error);
  });
});

// CREATE A CALENDAR ITEM
app.post("/calendar/create", async (req, res) => {
  const calendar = await models.Calendar.create(req.body);
  try {
    //for create op save to db like this
    await calendar.save();
    res.send(calendar);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE CALENDAR
app.post("/calendar/update/:mongoID", async (req, res) => {
  const mongo_id = req.params.mongoID;
  const newTodo = req.body;

  try {
    const updatedCalendar = await models.Calendar.findByIdAndUpdate(
      mongo_id,
      newTodo,
      {
        new: true,
      }
    );
    res.send(updatedCalendar);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/calendar/delete/:mongoID", async (req, res) => {
  const mongo_id = req.params.mongoID;

  try {
    const deletedCalendar = await models.Calendar.findByIdAndDelete(mongo_id);
    if (deletedCalendar) {
      res.send(deletedCalendar);
    } else {
      res.status(404).send("Calendar item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete all of a user's calendar events
app.delete("/calendar/deleteAll/:userID", async (req, res) => {
  const user_id = req.params.userID;
  await models.Calendar.deleteMany({user: user_id})
  .then(data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(500).send(error);
  });
});