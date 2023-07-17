import * as crud from "./crud.js";

export async function renderTodos(user_id) {
  const todoList = document.getElementById("todo-list");
  //clear all children before re-render
  todoList.innerHTML = "";

  const todos = await crud.readAllTodos(user_id);
  todos.forEach((todo) => {
    const title = todo.text;

    const li = document.createElement("li");

    //set HTML id to database id
    li.id = todo._id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    li.innerText = title;
    li.appendChild(checkbox);
    todoList.appendChild(li);
  });
}

export async function renderNote(user_id) {
  const note = document.getElementById("note");
  const db_note = await crud.initNote(note.innerText, user_id);
  note.innerText = db_note.text;
}

export async function renderUpcoming(user_id) {
  let today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = today.toLocaleDateString("en-US", options);
  today = new Date().getDay();
  const cell = document.getElementById(
    ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"][today]
  );
  // get deadline for the current day
  const deadlines = await crud.readDeadline(user_id);

  const current_day = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"][
    today
  ];
  const todayDeadlines = deadlines.filter((deadline) => deadline.day === current_day && (deadline.title !== ""));

  const title = document.getElementById("Upcoming-info");

  if (todayDeadlines.length > 0) {
    cell.innerText = todayDeadlines[0].title;
    title.innerHTML = `Today is ${dateStr}<br><br>You have to do:<br> ${todayDeadlines[0].title}`;
  }
  else {
    title.innerHTML = `Today is ${dateStr}<br`;
  }
}

export async function renderDeadlines(user_id) {
  const deadlines_popup = document.getElementById("deadline-edit-popup");

  const deadlines = await crud.readDeadline(user_id);

  deadlines.forEach((deadline) => {
    const dayBlock = document.getElementById(deadline.day);
    dayBlock.innerText = deadline.title;
    dayBlock.style.backgroundColor = deadline.backgroundColor;
    deadlines_popup.style.display = "none";
  });
}

export async function renderCalendar(user_id) {
  const eventNameInput = document.getElementById("event-name");
  const eventColorInput = document.getElementById("event-color");
  const eventDescriptionInput = document.getElementById("event-description");
  const eventTimeInput = document.getElementById("event-time");

  const events = await crud.readUserCalendar(user_id);

  events.sort(function (a, b) {
    const aTime = new Date("1970-01-01T" + a.time);
    const bTime = new Date("1970-01-01T" + b.time);
    return aTime - bTime;
  });

  eventNameInput.value = "";
  eventColorInput.value = "#000000";
  eventDescriptionInput.value = "";
  eventTimeInput.value = "";

  const day_cells = document.getElementsByClassName("calendar-cell");
  //reset before re-render
  Array.from(day_cells).forEach((cell) => (cell.innerHTML = ""));

  for (const event of events) {
    for (const day of event.days) {
      const cell = document.getElementById(day);
      const eventDiv = document.createElement("div");
      eventDiv.innerText = event.title;
      eventDiv.style.color = event.textColor;
      eventDiv.style.backgroundColor = event.highlightColor;

      eventDiv.classList.add("calendar-event");
      eventDiv.id = event._id;
      eventDiv.addEventListener("click", async function () {
        renderCalendarEventPopup(eventDiv.id);
      });
      cell.appendChild(eventDiv);
      const linebreak = document.createElement("br");
      cell.appendChild(linebreak);
    }
  }
}

export async function renderCalendarEventPopup(event_id) {
  const event = await crud.readEvent(event_id);

  const popup_Event = document.getElementById("event_popup");
  const title = popup_Event.querySelector(".event-title");
  const daysOfWeek = popup_Event.querySelector(".event-days");
  const time = popup_Event.querySelector(".event-time");
  const description = popup_Event.querySelector(".event-description");

  //clear before re-rendering
  title.textContent = "";
  daysOfWeek.textContent = "";
  time.textContent = "";
  description.textContent = "";

  const eventDiv = document.createElement("div");
  const eventName = document.createElement("span");
  const eventDays = document.createElement("span");
  const eventTime = document.createElement("span");
  const eventDescription = document.createElement("span");

  eventName.textContent = event.title;
  eventName.style.color = event.textColor;
  eventName.style.fontSize = "20px";
  eventName.style.display = "block";

  eventDays.textContent = "Days of the week: " + event.days.join(", ");
  eventDays.style.marginLeft = "20px";
  eventDays.style.display = "block";

  eventTime.textContent = "Time: " + event.time;
  eventTime.style.marginLeft = "20px";
  eventTime.style.display = "block";

  eventDescription.textContent = "Description: " + event.description;
  eventDescription.style.marginLeft = "20px";
  eventDescription.style.color = "black";
  eventDescription.style.display = "block";

  eventDiv.appendChild(eventName);
  eventDiv.appendChild(eventDays);
  eventDiv.appendChild(eventTime);
  eventDiv.appendChild(eventDescription);
  description.appendChild(eventDiv);

  popup_Event.style.display = "block";
}

export async function renderDisplayName(user_id) {
  const display_name = document.getElementById("hello-name-display");
  const user = await crud.readUser(user_id);
  display_name.innerText = `Hello ${user.firstName} ${user.lastName}`;
}
