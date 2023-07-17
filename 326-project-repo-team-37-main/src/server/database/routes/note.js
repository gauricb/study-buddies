import express from "express";
import * as models from "../models.js";

export const app = express();

/*Create a new person.
 *   accepts POST request with body properties matching the note schema
 *       - text: contents of note
 *       - user: mongo id
 *
 *   response is the note
 */
app.post("/note/create", async (req, res) => {
  try {
    const note = await models.Note.create(req.body);
    await note.save();
    res.status(201).send(note);
  } catch (err) {
    req.status(500).send(err);
  }
});

/*Reads the note of a user.
 *   accepts GET request with user_id as the url parameter
 *
 *   response is the note of the user
 */
app.get("/note/read/:user", async (req, res) => {
  const note = await models.Note.find(req.params);
  if (note == []) {
    res.status(404).send({ message: `User note not found` });
  } else {
    res.send(note[0]);
  }
});

/*Updates the note of a user.
 *   accepts POST request with body properties of new text and mongo id
 *       - text: new note contenets
 *       - user: mongo id
 *
 *   response is the note of the user
 */
app.post("/note/update", async (req, res) => {
  const user_id = req.body.user;
  const new_txt = req.body.text;
  const filter = {'user': user_id};
  const update = {"text": new_txt};
  try{
    const db_resp = await models.Note.findOneAndUpdate(filter, update, {new: true,});
      res.status(200);
  }
  catch(err){
    res.status(500).send(err);
  }
});
