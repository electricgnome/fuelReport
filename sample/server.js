const express = require('express');
const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const bodyParser = require('body-parser');

const dbConfig = require('./db-config');
const db = pgp(dbConfig);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
  response.redirect('/todos');
});

app.get('/todos', function(request, response) {
  db.any('select * from tsk')
    .then(function(todos) {
      response.render('todos.hbs', {
        todos: todos
      });
    })
});

app.post('/add_todo', function(request, response, next) {
  var desc = request.body.description;
  db.none(`insert into task values (default, '${desc}', FALSE)`)
    .then(function() {
      response.redirect('/todos');
    })
    .catch(next);
});

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
