# Team 37 Project

**Resources**
login/create account with Mongo: https://medium.com/nerd-for-tech/registration-login-using-the-mongodb-to-store-data-in-expressjs-dba79c8886f2


pouchDB: https://medium.com/beginners-guide-to-mobile-web-development/getting-started-with-pouchdb-f0f3d7baebab

pouchDB: https://blog.logrocket.com/build-application-with-node-js-pouchdb/

card component link bootstrap: https://getbootstrap.com/docs/5.3/components/card/

You are to start your team project here. Read the documentation for
[Pr2: Creative Idea](https://umass-cs-326.github.io/docs/project/Idea/) and replace this paragraph with your team's
creative web application idea!

**The team name: Team 37**

**The application name: Study Buddies**

**Team Overview:** 
    Hannah Allison: hannahalli, 
    Gauri Barar: gauricb, 
    Sage Chircu: SiCh3,
    Julianna Nazzaro: jsnazzaro

**Innovative Idea:** 
    For this project, we aim to create a web application that helps students manage their time, with the ability to add due dates to a calendar, create todo lists, set reminders, and get help making a schedule by inputting items that need to be done and the time that can be allocated to them. The application will have a personal section for which each student can have their information. It will also have a team section in which students can work together to set goals for a project. This application will have similar functionality to google calendar, Microsoft teams, slack, and other applications in the same realm. It will be different from these applications as it will be a more casual setting geared towards students, not businesses, and it will be free and function in a student-for-student way instead of a boss-to-team manner.  

**Data:**

Data types:
assignment calendar object:
{ class, assignment title, description (optional), due date, priority (based on time remaining), student-assigned priority }

class schedule object:
{ class title, meeting times/days } 

reminder object: 
{ calendar or to-do list object id, time remaining } 

student to-do list object: 
{ task, title, due date (optional) }

student team object (for stretch goal):
{ id, name, student members }


**Functionality:**
Features of our web application:

*Required Features*

- User authentication: User can make a new account or log in to an existing one. 
- Calendar: User can input their class schedule and their homework deadlines into the calendar. This creates a visual google calendar like view for them. 
- Schedule generator: User can input their assignments (and respective deadlines) and estimated time needed for completion. It will generate a custom schedule for the user based on these specifications. 
- To do list: User can input their to do lists and be able to check items off as they finish them. 
- Personal page: Page where user can see their to do lists and their calendar. 
- Reminders: User can choose to get reminders for their due dates. They can choose the frequency of reminders. 

*Stretch Features*
- Team page: Page where user can their team members' schedules and to do lists. Helpful for group projects.
- Schedule comparison: In order to find a time to meet with team members, this feature will compare schedules and find a time that works for all parties. 

License:
Apache-2.0 License (https://opensource.org/license/apache-2-0/)

