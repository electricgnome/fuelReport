'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      odometer: {
        type: Sequelize.INTEGER
      },
      units: {
        type: Sequelize.DECIMAL(5,2)
      },
      product: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.DECIMAL(6,2)
      },
      location: {
        type: Sequelize.STRING
      },
      vehicle_id: {
        type: Sequelize.STRING
      },
      merchant: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
     
    });
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('logs');
  }
};