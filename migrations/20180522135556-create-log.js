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
      miles: {
        type: Sequelize.INTEGER
      },
      gallons: {
        type: Sequelize.DECIMAL(5,2)
      },
      fuel_type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL(5,2)
      },
      location: {
        type: Sequelize.STRING
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