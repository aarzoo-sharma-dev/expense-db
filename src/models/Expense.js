"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User.js");
  const Group = import("./Group.js");
  const Expense = sequelize.define(
    "Expense",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUIDV4,
      },
      description: { type: DataTypes.TEXT, allowNull: false },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      paidBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: User, key: "id" },
      },
      groupId: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: { model: Group, key: "id" },
      },
    },
    {
      tableName: "Expense",
      timestamps: true,
      paranoid: true,
    },
  );

  Expense.associate = (models) => {
    Expense.belongsTo(models.User, {
      foreignKey: "paidBy",
      targetKey: "id",
      as: "payer",
    });

    Expense.belongsTo(models.Group, {
      foreignKey: "groupId",
      targetKey: "id",
      as: "group",
    });

    Expense.hasMany(models.ExpenseSplit, {
      foreignKey: "expenseId",
      sourceKey: "id",
      as: "splits",
    });
  };

  return Expense;
};
