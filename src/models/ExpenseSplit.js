"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User");
  const Expense = import("./Expense");
  const ExpenseSplit = sequelize.define(
    "ExpenseSplit",
    {
      expenseId: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: { model: Expense, key: "id" },
      },
      userId: {
        type: DataTypes.TEXT,
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
