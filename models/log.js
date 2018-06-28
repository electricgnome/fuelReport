'use strict';
module.exports = (sequelize, DataTypes) => {
  var log = sequelize.define('log', {
    miles: DataTypes.INTEGER,
    gallons: DataTypes.INTEGER,
    fuel_type: DataTypes.STRING,
    amount: DataTypes.DECIMAL(3,2),
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {});
  log.associate = function(models) {
    log.belongsTo(models.user);// associations can be defined here
  };
  return log;
};