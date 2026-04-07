"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User.js");
  const AuditLog = sequelize.define(
    "AuditLog",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: { model: User, key: "id" },
      },
      method: DataTypes.TEXT,
      endpoint: DataTypes.TEXT,
      paramKey: DataTypes.TEXT,
      paramValue: DataTypes.TEXT,
      body: DataTypes.JSON,
      result: DataTypes.TEXT,
      status: DataTypes.TEXT,
    },
    {
      tableName: "AuditLog",
      timestamps: true,
      paranoid: true,
    },
  );

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      as: "user",
    });
  };

  return AuditLog;
};
