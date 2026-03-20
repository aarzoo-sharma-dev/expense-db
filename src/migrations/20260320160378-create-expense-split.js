"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ExpenseSplit", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      expenseId: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      userId: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      percentage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      splitType: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isSettled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
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
    await queryInterface.dropTable("ExpenseSplit");
  },
};
