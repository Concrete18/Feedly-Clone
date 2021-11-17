'use strict';
const bcrypt = require("bcryptjs");

const fakeUsers = [
  {
    email: 'DougD@demo.dome',
    username: 'Doug_DemoDome',
    hashedPassword: bcrypt.hashSync('password'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
