'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Joe",
          lastName: 'Amin',
          email: "joe@smart.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Lami",
          lastName: 'Faku',
          email: "lami@smart.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Kimu",
          lastName: 'Jino',
          email: "kimu@smart.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete(
      "Users",
      null,
      {}
    )
  }
};