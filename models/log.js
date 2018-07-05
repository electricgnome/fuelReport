'use strict';
module.exports = (sequelize, DataTypes) => {
  var log = sequelize.define('log', {
    odometer: DataTypes.INTEGER,
    units: DataTypes.DECIMAL(5,2),
    product: DataTypes.STRING,
    cost: DataTypes.DECIMAL(6,2),
    vehicle_id: DataTypes.STRING,
    merchant: DataTypes.STRING,
    notes: DataTypes.TEXT,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {});
  log.associate = function(models) {
    log.belongsTo(models.user);// associations can be defined here
  };
  return log;
};