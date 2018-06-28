const express = require("express");
const nunjucks = require("nunjucks");
const body_parser = require("body-parser");

var app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);


app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.use("/socket-io", express.static("node_modules/socket.io-client/dist"));


io.on("connection", function(client) {
  console.log("CONNECTED");


  client.on("incoming", function(msg) {
    io.emit("chat-msg", msg);
  });


  client.on("disconnect", function() {
    console.log("EXITED");
  });
});


app.get("/", function(request, response) {
  response.render("chat.html");
});

http.listen(8080, function() {
  console.log("listening on port 8080");
});
