module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      passwordHash: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "User",
      paranoid: true,
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Group, {
      foreignKey: "createdBy",
      sourceKey: "id",
      as: "createdGroups",
    });

    User.hasMany(models.GroupMember, {
      foreignKey: "userId",
      sourceKey: "id",
      as: "memberships",
    });

    User.hasMany(models.Expense, {
      foreignKey: "paidBy",
      sourceKey: "id",
      as: "paidExpenses",
    });

    User.hasMany(models.ExpenseSplit, {
      foreignKey: "userId",
      sourceKey: "id",
      as: "splits",
    });

    User.hasMany(models.Payment, {
      foreignKey: "paidBy",
      sourceKey: "id",
      as: "paymentsMade",
    });

    User.hasMany(models.Payment, {
      foreignKey: "paidTo",
      sourceKey: "id",
      as: "paymentsReceived",
    });
  };
  return User;
};
