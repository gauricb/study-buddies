import "dotenv/config";
import mongoose from "mongoose";
import express from "express";

import * as UserRouter from "./database/routes/user.js";
import * as TodoRouter from "./database/routes/todo.js";
import * as CalendarRouter from "./database/routes/calendar.js";
import * as DeadlineRouter from "./database/routes/deadline.js";
import * as NoteRouter from "./database/routes/note.js";

const app = express();
app.use(express.json());

const MONGO_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = 3000;

app.use("/", express.static("../client/"));
app.use("/", express.static("../server/"));

mongoose.connect(MONGO_CONNECTION_URL);
const db = mongoose.connection;

db.on("error", () => console.log("Connection Failed!"));
db.once("open", () => console.log("Connected to mongodb!"));

app.use(UserRouter.app);
app.use(TodoRouter.app);
app.use(CalendarRouter.app);
app.use(DeadlineRouter.app);
app.use(NoteRouter.app);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
