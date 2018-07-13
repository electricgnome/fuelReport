'use strict';
module.exports = (sequelize, DataTypes) => {
  var report = sequelize.define('report', {
    card_number:DataTypes.STRING,
    department:DataTypes.STRING,
    vehicle_id: DataTypes.STRING,
    driver: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    merchant: DataTypes.STRING,
    odometer: DataTypes.INTEGER,
    product: DataTypes.STRING,
    units: DataTypes.DECIMAL(6,3),
    cost: DataTypes.DECIMAL(6,2)
  }, {});
  report.associate = function(models) {
//     report.belongsTo(models.user);// associations can be defined here
  report.belongsTo(models.log, {foreignKey: 'odometer', targetKey: 'odometer'})

  };
  return report;
};