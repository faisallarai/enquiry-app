'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Contacts",
      [
        {
          fullName: 'Issaka Faisal',
          email: 'faisal@smart.com',
          subject: 'Issaka',
          message: 'Faisal',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullName: 'Aziz Faisal',
          email: 'aziz@smart.com',
          subject: 'Aziz',
          message: 'PHD',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullName: 'Issaka Samiratu',
          email: 'samira@smart.com',
          subject: 'Samira',
          message: 'Issaka',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      ,
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
