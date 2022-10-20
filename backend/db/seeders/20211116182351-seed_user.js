"use strict";
const bcrypt = require("bcryptjs");

const fakeUsers = [
  {
    email: "DougD@demo.dome",
    username: "Doug_DemoDome",
    hashedPassword: bcrypt.hashSync("UfCL882`%Pu8`i;zLvu?"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
