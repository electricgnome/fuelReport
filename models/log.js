'use strict';
module.exports = (sequelize, DataTypes) => {
  var log = sequelize.define('log', {
    miles: DataTypes.INTEGER,
    gallons: DataTypes.DECIMAL(5,2),
    fuel_type: DataTypes.STRING,
    amount: DataTypes.DECIMAL(6,2),
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {});
  log.associate = function(models) {
    log.belongsTo(models.user);// associations can be defined here
  };
  return log;
};