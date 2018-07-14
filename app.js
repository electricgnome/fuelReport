// converted to use sequelize instead of pgp
const express = require("express");
nunjucks = require("nunjucks");
body_parser = require("body-parser");
jsonfile = "/src/file.json";
const Promise = require("bluebird");
session = require("express-session");
(redis = require("redis")),
  // client = redis.createClient(process.env.REDIS_URL);
  (RedisStore = require("connect-redis")(session));
pbkdf2 = require("pbkdf2");
passhelper = require("pbkdf2-helpers");
crypto = require("crypto");
//
var formidable = require("formidable");
var fs = require('fs');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:@localhost:5432/fuelReport');
//

let connection;

const db = require("./models"); //for use with sequelize

var app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));

var redis_options = { url: process.env.REDIS_URL || "redis://localhost:6379" };
var hour = 3600000;
app.use(
  session({
    store: new RedisStore(redis_options),
    secret: process.env.SECRET_KEY || "dev",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * hour }
  })
);
const sharedsession = require("express-socket.io-session");

io.use(
  sharedsession(
    session({
      store: new RedisStore(redis_options),
      secret: process.env.SECRET_KEY || "dev",
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 24 * hour }
    })
  )
);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.use(function(request, response, next) {
  if (request.session.user) {
    next();
  } else if (request.path == "/login") {
    next();
  } else if (request.path == "/register") {
    next();
  } else {
    response.redirect("/login");
  }
});

app.get("/register", function(request, response) {
  response.render("register.html");
});

app.post("/register", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var password2 = request.body.password2;
  var passcrypt = passhelper.generate_storage(password);

  if (passhelper.matches(password2, passcrypt)) {
    console.log("Matching passwords!!");
    db.user
      .create({
        firstName: request.body.fname.toUpperCase(),
        lastName: request.body.lname.toUpperCase(),
        email: request.body.email.toUpperCase(),
        phone: request.body.phone,
        employee_no: request.body.employee_no,
        card_number: request.body.card_no,
        department: request.body.department.toUpperCase(),
        passcrypt: passcrypt
      })
      .then(user => {
        response.redirect("/login");
      });
    //pass info to db.
  } else {
    console.log("mismatch!!");
    response.redirect("/register");
  }
});

app.get("/login", function(request, response) {
  response.render("login.html");
});

app.post("/login", function(request, response, next) {
  var username = request.body.username;
  var password = request.body.password;
  db.user.findOne({ where: { employee_no: username } }).then(user => {
    if (
      username == user.employee_no &&
      passhelper.matches(password, user.passcrypt)
    ) {
      request.session.user = username;
      console.log("Welcome!");
      response.redirect("/");
    } else {
      next();
      console.log("failed!");
      response.redirect("/login");
    }
  });
});

app.get("/logout", function(request, response) {
  request.session.destroy();
  response.redirect("login.html");
});

//Todo APPl

app.get("/", function(request, response) {
  // db.log.findAll({ include: [{ model: db.user }] }).then(logs => {
  //   db.user.findAll().then(users => {
  //     console.log("current user: " + request.session.user);
  //     response.render("index.html", { logs, users });
  //   });
    db.report.findAll({
     
      attributes: ['id','card_number', 'department', 'vehicle_id', 'driver', 'date', 'merchant', 'odometer', 'product', 'units', 'cost' ],
      order: ['date', 'department', 'driver']
    }).then(reports => {
    
        response.render("index.html", { reports});
      });
    // response.json({tasks: tasks})
  // });
});

app.post("/", function(request, response, next) {
  var file = new formidable.IncomingForm();
  file.parse(request, function(err, fields, files) {
    var oldPath = files.csvFile.path;
    // console.dir(files)
    // console.dir(" path: "+ files.csvFile.path +"  name: " + files.csvFile.name)
    var csvTable = files.csvFile.path + "/" + files.csvFile.name;
    console.log("csv path: "+ csvTable)
  
    if (files.csvFile.name==''){
      response.redirect("/");
    }else{
    var sysPath= "/home/electricgnome/projects/fuelReport/"
    var newPath = "public/csv/" + files.csvFile.name;
    // sequelize.query("COPY REPORTS FROM '"+ sysPath + newPath  + "' DELIMITER ',' CSV HEADER");
    sequelize.query("COPY REPORTS(card_number, department, vehicle_id, driver, date, merchant, odometer, product, units, cost) FROM '"+ csvTable + "'  DELIMITER ',' CSV HEADER");

    // fs.copyFile(oldPath, newPath, function(err) {
    //   if (err) throw err;
      response.redirect("/");
    // });
  }});
});



app.get("/import", function(request, response) {
  response.render("importing.html")
});

app.post("/import_logs", function(request, response, next) {
  var file = new formidable.IncomingForm();
  file.parse(request, function(err, fields, files) {
    var oldPath = files.csvFile.path;
    var csvTable = files.csvFile.path + "/" + files.csvFile.name;
    console.log("csv path: "+ csvTable)
  
    if (files.csvFile.name==''){
      response.redirect("/log");
    }else{
    // var sysPath="/home/gnome/projects/fuelReport/"
    // var sysPath= "/home/electricgnome/projects/fuelReport/"
    // var newPath = "public/csv/" + files.csvFile.name;
    // sequelize.query("COPY USERS(employee_no, "+ '"firstName", "lastName"'+", email, phone, card_number, department, " + '"createdAt", "updatedAt"'+") FROM '"+ sysPath + newPath  + "'  DELIMITER ',' CSV HEADER");
  
    sequelize.query("COPY LOGS(" + '"userId"' + ", odometer, units, product, cost, vehicle_id, merchant, date," + '"createdAt", "updatedAt"'+") FROM '"+ csvTable + "'  DELIMITER ',' CSV HEADER");
      response.redirect("/log");
 
  }});
});

app.post("/import_users", function(request, response, next) {
  var file = new formidable.IncomingForm();
  file.parse(request, function(err, fields, files) {
    var oldPath = files.csvFile.path;
    var csvTable = files.csvFile.path + "/" + files.csvFile.name;
    console.log("csv path: "+ csvTable)
  
    if (files.csvFile.name==''){
      response.redirect("/log");
    }else{
    // var sysPath="/home/gnome/projects/fuelReport/"
    var sysPath= "/home/electricgnome/projects/fuelReport/"
    var newPath = "public/csv/" + files.csvFile.name;
    sequelize.query("COPY USERS(employee_no, "+ '"firstName", "lastName"'+", email, phone, card_number, department, " + '"createdAt", "updatedAt"'+") FROM '"+ csvTable  + "'  DELIMITER ',' CSV HEADER");
  
    // sequelize.query("COPY LOGS(" + '"userId"' + ", odometer, units, product, cost, vehicle_id, merchant, date," + '"createdAt", "updatedAt"'+") FROM '"+ sysPath + newPath  + "'  DELIMITER ',' CSV HEADER");
      response.redirect("/log");
 
  }});
});


app.post("/search", function(request, response, next){
  console.table([{dateRange: request.body.dateRange}]);
  var dateRange =((request.body.dateRange == '') ? new Date('01/01/2017') : new Date(request.body.dateRange))
  var days = parseInt(request.body.days);
  var dayRange =((request.body.dateRange == '') ?new Date('01/01/2100'): new Date(dateRange.getFullYear(), dateRange.getMonth(), dateRange.getDate()+ days))
  var option = request.body.option;
  var query = ((request.body.query =='') ? {[sequelize.Op.notLike]:"a"} :  (typeof request.body.query ==='string') ? request.body.query.toUpperCase() : request.body.query );
 
  console.table([{dateRange: dateRange, days: days, dayRange:dayRange, query: query }])

  db.report.findAll({ 
    include: [ {model:db.log,attributes:['vehicle_id', 'date', 'merchant','odometer', 'units', 'cost'], requiered: true}],
    attributes: ['id','card_number', 'department', 'vehicle_id', 'driver', 'date', 'merchant', 'odometer', 'product', 'units', 'cost' ],
    order: ['date', 'department','driver'],
    where: {
      date:{
        [sequelize.Op.gte]: dateRange, 
        [sequelize.Op.lte]: dayRange
      },
      [option]:query
    }}).then(reports => {
    response.render("index.html", {reports})
  })
}); 

app.get("/report", function(request, response) {
  response.render("report.html");
});

app.post("/success", function(request, response, next) {
  var data = request.body;
  // console.log(data.first_name1)
  response.render("success.html", { data });
});

app.get("/log", function(request, response) {
  db.user
    .findAll({ where: { employee_no: request.session.user } })
    .then(users => {
      db.log
        .findAll({
          include: [{ model: db.user }],
          where: { userId: users[0].id }
        })
        .then(logs => {
          console.log("current user ID: " + request.session.user);
          response.render("log_fuel.html", { logs, users });
        });
      // response.json({tasks: tasks})
    });
});

app.post("/log", function(request, response, next) {
  console.log("DUE: " + request.body.date);
  var due_date = Date.now();
  if (
    (request.body.miles != "") &
    (request.body.gallons != "") &
    (request.body.amount != "")
  ) {
    db.log
      .create({
        userId: request.body.user_id,
        odometer: request.body.odometer,
        units: request.body.units,
        product: request.body.product,
        cost: request.body.cost,
        vehicle_id: request.body.vehicle_id.toUpperCase(),
        merchant: request.body.merchant.toUpperCase(),
        notes: request.body.notes.toUpperCase(),
        location: "loc",
        due: due_date
      })
      .then(log => {
        // console.log("task: " + task.get('name') + " ");
        response.redirect("/log");
      })
      .catch(next);
  } else {
    // response.send(500, 'ShowAlert')
    response.redirect("/log");
    console.log("this: " + request.body.n_task);
  }
});

app.post("/todos/:done", function(request, response, next) {
  var tasks = request.body.task;
  if (typeof tasks === "string") {
    tasks = [tasks];
  } else if (typeof tasks === "undefined") {
    tasks = [0];
  }
  tasks = tasks.map(JSON.parse);

  var promises = [];

  if (request.body.action == "done") {
    for (let i = 0; i < tasks.length; i++) {
      var stat = !tasks[i].status;
      var p = db.task.update({ status: stat }, { where: { id: tasks[i].id } });
      promises.push(p);
    }
  } else if (request.body.action == "remove") {
    for (let i = 0; i < tasks.length; i++) {
      var stat = !tasks[i].status;
      var p = db.task.destroy({ where: { id: tasks[i].id } });
      promises.push(p);
    }
  }
  Promise.all(promises)
    .then(result => {
      response.redirect("/todos");
      // response.json({success: true})
    })
    .catch(next);
});

//===========chat app----------------

app.use("/socket-io", express.static("node_modules/socket.io-client/dist"));

var users = [];
io.on("connection", function(client) {
  // console.log(client.id + " CONNECTED");
  // client.emit("message", "Welcome!")
  // client.users=[];
  // io.emit("users", client.users)

  client.on("user", function(user) {
    client.username = user;
    console.log("user: " + client.username);
    if (!users.includes(user)) {
      users.push(user);
    }

    io.emit("users", users);
    console.log("list of users: " + users);
  });

  client.on("incoming", function(msg, user) {
    io.emit("chat-msg", user, msg);
  });

  client.on("disconnect", function(user) {
    client.emit("message", client.username + " has left the room.");
    console.log(client.username + " EXITED");
  });
});
//===============-------------------------

app.get("/chat", function(request, response) {
  response.render("chat.html");
});

var PORT = process.env.PORT || 8800;
http.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
