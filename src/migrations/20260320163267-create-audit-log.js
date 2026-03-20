"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AuditLog", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      userId: Sequelize.TEXT,
      method: Sequelize.TEXT,
      endpoint: Sequelize.TEXT,
      paramKey: Sequelize.TEXT,
      paramValue: Sequelize.TEXT,
      body: Sequelize.JSON,
      result: Sequelize.TEXT,
      status: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AuditLog");
  },
};
