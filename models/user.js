'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    employee_no: DataTypes.INTEGER,
    card_number: DataTypes.STRING,
    department: DataTypes.STRING,
    passcrypt: DataTypes.STRING(40106)
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};