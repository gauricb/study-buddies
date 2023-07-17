import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const NoteSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const CalendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  days: {
    type: [String], 
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  highlightColor: {
    type: String, //represent hex as string
    required: false,
    default: "#FFFFFF", //white
  },
  textColor: {
    type: String, //represent hex as string
    required: false,
    default: "#000000", //black
  },
  description: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const DeadlineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: false,
    default: "#FFFFFF", //white
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//export must be followed by declaration
export const User = mongoose.model("User", UserSchema);
export const Note = mongoose.model("Note", NoteSchema);
export const Todo = mongoose.model("Todo", TodoSchema);
export const Calendar = mongoose.model("Calendar", CalendarSchema);
export const Deadline = mongoose.model("Deadline", DeadlineSchema);
