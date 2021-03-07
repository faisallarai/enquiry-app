'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Contacts',
      'status',
      {
        type: Sequelize.STRING 
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Contacts',
      'status'
    )
  }
};
