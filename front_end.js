// converted to use sequelize instead of pgp
const express = require("express");
const setup = require('./setup');
body_parser = require("body-parser");
jsonfile = "/src/file.json";
const Promise = require("bluebird");
session = require("express-session");
redis = require("redis"),
// client = redis.createClient();
RedisStore = require("connect-redis")(session);

var ses = require('./ses')
// ses.send_mail({});


let connection;

const db = require("./models"); //for use with sequelize

var app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));

var redis_options = {url: process.env.REDIS_URL || 'redis://localhost:6379'}
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

setup.set_app(app);

app.get("/", function(request, response) {
  response.render("quote_form.html");
});

app.get("/carriers", function(request, response) {
    response.render("carriers.html");
  });

  app.get("/about", function(request, response) {
    response.render("about.html");
  });

  app.get("/contact", function(request, response) {
    response.render("contact.html");
  });

  app.post("/contact", function(request, response) {
    var form_data = request.body
    ses.send_mail({form_data});
    response.redirect("/");
  });

app.post("/success", function (request, response, next) {
  var form_data = request.body
  ses.send_mail({form_data});
  response.render("success.html", {form_data});
  // response.render("email.html", {data});
  
});


app.use("/socket-io", express.static("node_modules/socket.io-client/dist"));

//chat app----------------
io.on("connection", function(client) {
  console.log("CONNECTED");


  client.on("incoming", function(msg) {
    io.emit("chat-msg", msg);
  });


  client.on("disconnect", function() {
    console.log("EXITED");
  });
});
//-------------------------

var PORT = process.env.PORT || 8800;
http.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});

// http.listen(8800, function() {
//   console.log("Listening on port 8800");
// });


