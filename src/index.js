require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.EXPENSE_DB,
  process.env.EXPENSE_DB_USER,
  process.env.EXPENSE_DB_PASSWORD,
  {
    host: process.env.EXPENSE_DB_HOST,
    dialect: "postgres",
    pool: {
      max: 20,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // For self-signed certificates
      },
    },
    logging: process.env.EXPENSE_DB_LOGGING === "true",
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
