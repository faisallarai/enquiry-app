'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false,
        isEmail: true
      },
      subject: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        notEmpty: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false,
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  }
};