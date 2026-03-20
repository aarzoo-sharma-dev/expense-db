"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User");
  const Group = import("./Group");
  const Payment = sequelize.define(
    "Payment",
    {
      paidBy: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: { model: User, key: "id" },
      },
      paidTo: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: { model: User, key: "id" },
      },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      groudId: {
        type: DataTypes.TEXT,
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
