'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
   
    phone: DataTypes.STRING,
   
    employee: DataTypes.INTEGER,
   
    wex: DataTypes.STRING,
  
    passcrypt: DataTypes.STRING(40106)
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};