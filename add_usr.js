var db = require("./models");
var me;
// create a user
db.user.create({ firstName: "admin" }).then(function(user) {
  console.log(user);
  me = user;
  me.lastName = "kappa";
  me.email = "admin@kappainsure.com";
  me.save().then(() => {
    console.log("done saving");
  });
});
// update a user

db.user.create({ firstName: "Hector" }).then(function(user) {
  console.log(user);
  me = user;
  me.lastName = "Saldana";
  me.email = "hector@kappainsure.com";
  me.save().then(() => {
    console.log("done saving");
  });
});
// update a user

db.user.create({ firstName: "Emy" }).then(function(user) {
  console.log(user);
  me = user;
  me.lastName = "Saldana";
  me.email = "emy@kappainsure.com";
  me.save().then(() => {
    console.log("done saving");
  });
});
// update a user

db.user.create({ firstName: "Perla" }).then(function(user) {
  console.log(user);
  me = user;
  // update a user
  me.lastName = "Tapia";
  me.email = "perla@kappainsure.com";
  me.save().then(() => {
    console.log("done saving");
  });
});
