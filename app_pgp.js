const express = require("express");
const nunjucks = require("nunjucks");
const body_parser = require("body-parser");
const jsonfile = "/src/file.json";

const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});

const dbConfig = require('./db-config');
const db = pgp(dbConfig);
let connection;

// const db = require('./models'); //for use with sequelize

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.get("/", function (request, response) {
  response.redirect("/todos");
});

//Todo APP

app.get("/todos", function (request, response) {
  db.any(`SELECT * FROM task `)
    .then(function (tasks) {
      // console.log(tasks)
      response.render("todos.html", { tasks });
      // response.json({tasks: tasks})
    });

});

app.post("/todos", function (request, response, next) {
  var new_task = request.body.n_task;
  if (new_task != '') {
    db.none(`INSERT INTO task(description, done) VALUES($1, $2)`, [request.body.n_task, false])
      .then(() => {
        console.log("Success!");
        response.redirect("/todos");
      })
      .catch(next);
  } else {
    response.redirect("/todos");
    console.log("this: " + request.body.n_task);
  }

});

app.post("/todos/:done", function (request, response, next) {

  var tasks = request.body.task
  if (typeof tasks === 'string') {
    tasks = [tasks]
  } else if (typeof tasks === 'undefined') {
    tasks = [0]
  }
  tasks = tasks.map(JSON.parse)

  var promises = [];

  if (request.body.action == "done") {

    for (let i = 0; i < tasks.length; i++) {
      var status = !tasks[i].status;
      var p = db.query('UPDATE task SET done = $1 WHERE id= $2', [status, tasks[i].id]);
      promises.push(p);
    }

  } else if (request.body.action == "remove") {

    for (let i = 0; i < tasks.length; i++) {
      var status = !tasks[i].status;
      var p = db.query('DELETE FROM task WHERE id = $1', [tasks[i].id]);
      promises.push(p);
    }
  }
  Promise.all(promises)
    .then(data => {
      response.redirect("/todos");
      // response.json({success: true})
    })
    .catch(next);
});


app.listen(8000, function () {
  console.log("Listening on port 8000");
});



