"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_number: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      vehicle_id: {
        type: Sequelize.STRING
      },
      driver: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      merchant: {
        type: Sequelize.STRING
      },
      odometer: {
        type: Sequelize.INTEGER
      },
      product: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.DECIMAL(6, 3)
      },
      cost: {
        type: Sequelize.DECIMAL(6, 2)
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("reports");
  }
};
