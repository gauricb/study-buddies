import express from "express";
import * as models from "../models.js";

export const app = express();

app.post("/user/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await models.User.findOne({
      username: username,
      password: password,
    }); 
    if (user === null || Object.keys(user).length === 0) {
      res.status(500).end("wrong login info");
      return;
    }
    //directly send the main view url to redirect to for a given user _id
    const url_json = {url: `http://localhost:3000/mainView.html?user_id=${user._id}`}
    return res.status(303).redirect(303, `http://localhost:3000/mainView.html?user_id=${user._id}`);

  } catch (error) {
    res.status(500).send(error);
  }
});

//where body is json w/ all fields in schema (use postman to test)
app.post("/user/create", async (req, res) => {
  const user = await models.User.create(req.body);
  try {
    //for create op save to db like this
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//returns array of users
app.get("/user/readAll", async (req, res) => {
  const users = await models.User.find({});

  try {
    res.send(users);
  } catch (error) {
    req.status(500).send(error);
  }
});

//TODO: FIX? not working in postman but working with fetch?
app.get("/user/readOne/:mongo_id", async (req, res) => {
  const mongo_id = req.params.mongo_id;

  const user = await models.User.findById(mongo_id);
  try {
    if (user === null || Object.keys(user).length === 0) {
      res.status(500).end("nonexistent user id");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/user/delete/:mongo_id", async (req, res) => {
  const mongo_id = req.params.mongo_id;

  try {
    const deletedUser = await models.User.findByIdAndDelete(mongo_id);
    if (deletedUser) {
      res.send(deletedUser);
    } else {
      res.status(404).send("User item not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
