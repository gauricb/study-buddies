# Database Schemas

**To-do List Object**

```Javascript   
{
    type: "todo",
    title: String
} 
```

**Notes Object**

There is only ever 1 note object for a given user

```Javascript   
{
    type: "note",
    text: String
} 
```

**Calendar Event Object**

```Javascript   
{
    type: "calendar-event",
    title: String,
    date-time: ISO String
} 
```

**Deadline Object**

```Javascript   
{
    type: "deadline"
    title: String,
    due-date-time: ISO String
} 
```

**Upcoming Event Object**

```Javascript   
{
    type: "upcoming",
    deadline: deadline object database _id
} 
```

**User Object**

```Javascript   
{
    type: "user",
    firstName: String
    lastName: String
    username: String
    password: String
} 
```
