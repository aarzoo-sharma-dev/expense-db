"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User.js");
  const Group = import("./Group.js");
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      paidBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: User, key: "id" },
      },
      paidTo: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: User, key: "id" },
      },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      groudId: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: { model: Group, key: "id" },
      }, // typo kept
    },
    {
      tableName: "Payment",
      timestamps: true,
      paranoid: true,
    },
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
      foreignKey: "paidBy",
      targetKey: "id",
      as: "payer",
    });

    Payment.belongsTo(models.User, {
      foreignKey: "paidTo",
      targetKey: "id",
      as: "receiver",
    });
  };

  return Payment;
};
