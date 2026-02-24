'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AppointmentServices", [
      {
        id: require("crypto").randomUUID(),
        name: "Haircut",
        description: "Basic haircut service",
        price: 500,
        showTime: 30,
        order: 1,
        isRemove: false,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: require("crypto").randomUUID(),
        name: "Coloring",
        description: "Hair coloring service",
        price: 1500,
        showTime: 90,
        order: 2,
        isRemove: false,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AppointmentServices", null, {});
  }
};
