"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User.js");
  const Expense = import("./Expense.js");
  const ExpenseSplit = sequelize.define(
    "ExpenseSplit",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      expenseId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: Expense, key: "id" },
      },
      userId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: User, key: "id" },
      },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      percentage: DataTypes.FLOAT,
      splitType: { type: DataTypes.TEXT, allowNull: false },
      isSettled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "ExpenseSplit",
      timestamps: true,
      paranoid: true,
    },
  );

  ExpenseSplit.associate = (models) => {
    ExpenseSplit.belongsTo(models.Expense, {
      foreignKey: "expenseId",
      targetKey: "id",
      as: "expense",
    });

    ExpenseSplit.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      as: "user",
    });
  };

  return ExpenseSplit;
};
