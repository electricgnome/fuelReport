// let email_name = $("#user").attr("value") || "none";
// var v_user = email_name.split("@")[0];
// if (v_user !== "") {
//   localStorage.setItem("user", v_user);
// }
// user = localStorage.getItem("user");
// var user_li = [];
// // date1.setDate(date1.getDate()+1);

// // =====chat app ==========
// var server = io();
// server.on("connect", function(socket) {
//   console.log(user + " connected");
// });
// server.emit("user", user);

// server.on("message", function(message) {
//   var chat = document.getElementById("chat-box");
//   chat.insertAdjacentHTML("beforeend", "\n" + message);
//   alert("Server says: " + message);
// });

// server.on("users", function(users) {
//   users.forEach(element => {
//     console.log(user_li);

//     if (!user_li.includes(element)) {
//       var node = document.createElement("LI");
//       var textnode = document.createTextNode(element);
//       node.appendChild(textnode);
//       document.getElementById("user_list").appendChild(node);
//       user_li.push(element);
//     }
//   });
// });
// server.on("chat-msg", function(user, msg) {
//   var chat = document.getElementById("chat-box");
//   chat.insertAdjacentHTML("beforeend", "\n" + user + ": " + msg);
// });

// function send_message(event) {
//   var char = event.which || event.keyCode;
//   if (char == "13") {
//     var msg = document.getElementById("message");
//     server.emit("incoming", msg.value, user);
//     msg.value = "";
//   }
// }
// =====end chat app =========

function materialize() {
  $(".modal").modal();
  $(".datepicker1").datepicker({
    format: "yyyy-mm-dd",
    // minDate: date1
  });

  $(".datepicker").datepicker({
    format: "yyyy/mm/dd",
    yearRange: 90
  });
  $("select").formSelect();
  $(".tabs").tabs({});

  $(".tooltipped").tooltip();
  $(".sidenav").sidenav();
  $(".fixed-action-btn").floatingActionButton({
    direction: "left",
    hoverEnabled: false
  });

  $("input.counter").characterCounter();

  $('input.autocomplete').autocomplete({
    data:{
      "ALON": null,
      "CHEVRON": null,
      "CHVRNWF": null,
      "CIRCLE K": null,
      "DIAMOND": null,
      "EXXONMOB": null,
      "FLYING J": null,
      "LOVES": null,
      "MURPHY USA": null,
      "PHILL 66": null,
      "PILOT": null,
      "QUIKTRIP": null,
      "ROAD RANGER": null,
      "SHELL": null,
      "SUNOCO": null,
      "TA": null,
      "UNBRANDED": null,
      "WEST TEXAS": null,
      "WTG FUEL": null
    },
  });

}


$(window).on("load", function() {
  materialize();
  $(".collapsible").collapsible();
 var res = document.getElementById("searchTable").rows.length -1
  document.getElementById("totals").innerHTML = "total entries found:" + res;
});