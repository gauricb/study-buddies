
//*****************************************CRUD FOR USER
//returns user object with mongo id user_id
export async function readUser(user_id) {
  const res = await fetch(`/user/readOne/${user_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const user = await res.json();
  return user;
}

//***************************************CRUD FOR CALENDAR
export async function createCalendarEvent(newEvent) {
  try {
    const res = await fetch(`/calendar/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    return res.ok;
  } catch (error) {
    console.log(error);
  }
}

export async function readUserCalendar(user_id) {
  try {
    const res = await fetch(`/calendar/readUser/${user_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const events = await res.json();
    return events;
  } catch (error) {
    console.log(error);
  }
}

export async function readUserCalendarDay(user_id, day) {
  try {
    const res = await fetch(`/calendar/readUserDay/${user_id}/${day}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const events = await res.json();
    return events;
  } catch (error) {
    console.log(error);
  }
}

export async function readEvent(event_id) {
  try {
    const res = await fetch(`/calendar/readEvent/${event_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const event = await res.json();
    return event;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserCalendar(user_id) {
  try {
    const res = await fetch(`/calendar/deleteAll/${user_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    
    const events = await res.json();
    return events;
  } catch (error) {
    console.log(error);
  }
}

//***************************************CRUD FOR TO-DO LIST
export async function createTodo(title, user_id) {
  await fetch("/todo/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text: title,
      user: user_id,
    }),
  });
}

//used for rendering
export async function readAllTodos(user_id) {
  const res = await fetch(`/todo/readUser/${user_id}`);
  const todos = await res.json();

  return todos;
}

export async function deleteTodo(toDelete) {
  // delete the specific to do from the database

  for (let i = 0; i < toDelete.length; i++) {
    const fetch_req = "/todo/delete/" + toDelete[i].id;
    await fetch(fetch_req, {
      method: "DELETE",
    });
  }
}

export async function updateTodo(list_id, newText) {
  const fetch_req = "/todo/update/" + list_id;
  await fetch(fetch_req, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text: newText,
    }),
  });
}

//***************************************CRUD FOR DEADLINE
export async function createDeadline(title, day, backgroundColor, user_id) {
  await fetch("deadline/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title: title,
      day: day,
      backgroundColor: backgroundColor,
      user: user_id,
    }),
  });
}

export async function readDeadline(user_id) {
  const res = await fetch(`/deadline/readUser/${user_id}`);
  const deadlines = await res.json();

  return deadlines;
}

export async function eraseDeadline(day) {
  const get_id_res = await fetch(`/deadline/getOne/${day}`);
  const deadline_json = await get_id_res.json();

  for (let i = 0; i < deadline_json.length; i++) {
    await fetch(`/deadline/delete/${deadline_json[i]._id}`, {
      method: "DELETE",
    });
  }
}

//***************************************CRUD FOR NOTE
//"create" note during initialization with prompt text
export async function createNote(text, user_id) {
  await fetch("/note/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text: text,
      user: user_id,
    }),
  });
}

export async function readNote(user_id) {
  const res = await fetch(`/note/read/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const note = await res.json();
  return note;
}

export async function updateNote(text, user_id) {
  const res = await fetch("/note/update", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text: text,
      user: user_id,
    }),
  });
  const note = await res.json();
}

export async function initNote(text, user_id) {
  var doc;
  try {
    doc = await readNote(user_id);
  } catch (err) {
    await createNote(text, user_id);
    doc = await readNote(user_id);
  }
  return doc;
}
