"use strict";

module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    "GroupMember",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUIDV4,
      },
      groupId: { type: DataTypes.UUIDV4, allowNull: false },
      userId: { type: DataTypes.UUIDV4, allowNull: false },
      role: { type: DataTypes.TEXT, allowNull: false },
      joinedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      tableName: "GroupMember",
      timestamps: true,
      paranoid: true,
    },
  );

  GroupMember.associate = (models) => {
    GroupMember.belongsTo(models.Group, {
      foreignKey: "groupId",
      targetKey: "id",
      as: "group",
    });

    GroupMember.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      as: "user",
    });
  };

  return GroupMember;
};
