'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("AppointmentServices", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      price: { type: Sequelize.INTEGER, allowNull: false },
      showTime: { type: Sequelize.INTEGER, allowNull: false },
      order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      isRemove: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      isPublic: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },

      ShopId: { type: Sequelize.UUID, allowNull: true },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
    });

    await queryInterface.addIndex("AppointmentServices", ["ShopId"], {
      name: "appointment_services__shop_id",
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable("AppointmentServices");
  }
};
