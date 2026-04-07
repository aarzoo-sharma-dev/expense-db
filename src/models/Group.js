"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = import("./User.js");
  const Group = sequelize.define(
    "Group",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUIDV4,
      },
      groupName: { type: DataTypes.TEXT, allowNull: false },
      createdBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: User, key: "id" },
      },
    },
    {
      tableName: "Group",
      timestamps: true,
      paranoid: true,
    },
  );

  Group.associate = (models) => {
    Group.belongsTo(models.User, {
      foreignKey: "createdBy",
      targetKey: "id",
      as: "creator",
    });

    Group.hasMany(models.GroupMember, {
      foreignKey: "groupId",
      sourceKey: "id",
      as: "members",
    });

    Group.hasMany(models.Expense, {
      foreignKey: "groupId",
      sourceKey: "id",
      as: "expenses",
    });
  };

  return Group;
};
