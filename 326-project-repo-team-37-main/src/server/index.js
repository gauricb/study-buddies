import * as crud from "./crud.js";
import * as render from "./render.js";

// Retrieve the user_id from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("user_id");


//*************************************WINDOW LOAD EVENT HANDLERS

document.addEventListener("DOMContentLoaded", async function () {
  const popup1 = document.getElementById("deadline-edit-popup");
  popup1.style.display = "none";
  const popup_Event = document.getElementById("event_popup");
  popup_Event.style.display = "none";
  const addTodoPopup = document.getElementById("add-todo-popup");
  addTodoPopup.style.display = "none";
  const deadlines_popup2 = document.getElementById("deadlines-delete-popup");
  deadlines_popup2.style.display = "none";
  await render.renderTodos(user_id);
  await render.renderNote(user_id);
  await render.renderUpcoming(user_id);
  await render.renderCalendar(user_id);
  await render.renderDisplayName(user_id);
  await render.renderDeadlines(user_id);
});

//*************************************NOTES EVENT HANDLERS

const note_edit_button = document.getElementById("note-edit-button");
const note_done_button = document.getElementById("note-done-button");
let paragraph = document.getElementById("note");

note_edit_button.addEventListener("click", function () {
  paragraph.contentEditable = "true";
  paragraph.style.backgroundColor = "#dddbdb";

  note_done_button.addEventListener("click", async function () {
    paragraph.contentEditable = "false";
    paragraph.style.backgroundColor = "rgb(231, 199, 255)";
    await crud.updateNote(paragraph.innerText, user_id);
    await render.renderNote(user_id);
  });
});

//*************************************TODO-LIST EVENT HANDLERS

const todo_list = document.getElementById("todo-list");
const todo_add_button = document.getElementById("todo-add-button");
const todo_clear_button = document.getElementById("todo-clear-button");

//popup elements
const addTodoPopup = document.getElementById("add-todo-popup");
const addTodoButton = document.getElementById("add-todo-button");
const closeAddTodoPopup = addTodoPopup.querySelector(".close-popup");
const newTodoInput = document.getElementById("new-todo-input");

todo_add_button.addEventListener("click", function () {
  addTodoPopup.style.display = "block";
});

closeAddTodoPopup.addEventListener("click", function () {
  addTodoPopup.style.display = "none";
});

addTodoButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const newTodo = newTodoInput.value.trim();
  if (newTodo !== "") {
    const res = await crud.createTodo(newTodo, user_id);
    await render.renderTodos(user_id);
    addTodoPopup.style.display = "none";
    newTodoInput.value = "";
  }
});


todo_clear_button.addEventListener("click", async function () {
  const listItems = todo_list.getElementsByTagName("li");
  const toDelete = Array.from(listItems).filter(
    (item) => item.querySelector(".checkbox").checked
  );
  const res = await crud.deleteTodo(toDelete);

  await render.renderTodos(user_id);

  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].querySelector(".checkbox").checked) {
      todo_list.removeChild(listItems[i]);
      i--;
    }
  }
});

//*************************************DEADLINES EVENT HANDLERS

const deadlines_popup = document.getElementById("deadline-edit-popup");
const tableCellSelect = document.getElementById("table-cell");
const textInput = document.getElementById("text");
const colorInput = document.getElementById("color");
const deadlines_popup_updateButton = document.getElementById("update-button");
const deadlines_popup_cancelButton = document.getElementById("cancel-button");
const deadlines_editButton = document.getElementById("dealines-edit-button");
const deadlines_eraseButton = document.getElementById("dealines-erase-button");
const deadlines_popup2 = document.getElementById("deadlines-delete-popup");
const deadlines_popup_eraseButton = document.getElementById(
  "deadlines-popup-erase-button"
);

deadlines_editButton.addEventListener("click", function () {
  deadlines_popup.style.display = "block";
});
deadlines_eraseButton.addEventListener("click", function () {
  deadlines_popup2.style.display = "block";
});

deadlines_popup_updateButton.addEventListener("click", async function () {
  const selectedCell = document.getElementById(tableCellSelect.value);
  selectedCell.innerText = textInput.value;
  selectedCell.style.backgroundColor = colorInput.value;
  deadlines_popup.style.display = "none";
  await crud.createDeadline(
    textInput.value,
    selectedCell.id,
    colorInput.value,
    user_id
  );
  await render.renderUpcoming(user_id);
});

deadlines_popup_eraseButton.addEventListener("click", async function () {
  const eraseTableCellSelect = document.getElementById("erase-table-cell");
  const selectedCell = document.getElementById(eraseTableCellSelect.value);
  selectedCell.innerText = "";
  selectedCell.style.backgroundColor = "#FFFFFF";
  deadlines_popup2.style.display = "none";
  await crud.eraseDeadline(selectedCell.id);
  await render.renderUpcoming(user_id);
});

deadlines_popup_cancelButton.addEventListener("click", function () {
  deadlines_popup.style.display = "none";
});

//*************************************CALENDAR EVENT HANDLERS

const calendar_popup = document.getElementById("myModel");
const calendar_update_button = document.getElementById(
  "calendar-update-button"
);
const exit_calendar_popup = document.getElementsByClassName("close")[0];
const addEventButton = document.getElementById("update-calendar-button");
const calendar_remove_button = document.getElementById(
  "calendar-remove-button"
);

calendar_remove_button.addEventListener("click", async function () {
  await crud.deleteUserCalendar(user_id);
  await render.renderCalendar(user_id);
});

calendar_update_button.addEventListener("click", function () {
  calendar_popup.style.display = "block";
});

exit_calendar_popup.addEventListener("click", function () {
  calendar_popup.style.display = "none";
});

addEventButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const eventNameInput = document.getElementById("event-name").value;
  const eventDaysInput = document.getElementsByName("days[]");
  const eventColorInput = document.getElementById("event-color").value;
  const eventDescriptionInput = document.getElementById("event-description").value;
  const eventTimeInput = document.getElementById("event-time").value;
  const highlightColor = document.getElementById("highlight-color").value;

  //get days of week of new event
  const daysOfWeek = Array.from(eventDaysInput).filter(item => item.checked).map(item => item.value);

  const newEvent = {
    title: eventNameInput,
    ...(daysOfWeek.length > 0) && {days: daysOfWeek},
    time: eventTimeInput,
    highlightColor: highlightColor,
    textColor: eventColorInput,
    description: eventDescriptionInput,
    user: user_id,
  };

  const ok = await crud.createCalendarEvent(newEvent);
  await render.renderCalendar(user_id);
  calendar_popup.style.display = "none";
});

const popup_Event = document.getElementById("event_popup");
const exit_Event_popup = document.getElementById("event_popup");
exit_Event_popup.addEventListener("click", function () {
  popup_Event.style.display = "none";
});
