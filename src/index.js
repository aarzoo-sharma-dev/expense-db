require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.EXPENSE_DB,
  process.env.EXPENSE_DB_USER,
  process.env.EXPENSE_DB_PASSWORD,
  {
    host: process.env.EXPENSE_DB_HOST,
    dialect: "postgres",
    pool: {
      max: process.env.EXPENSE_DB_POOL_MAX || 20,
      acquire: process.env.EXPENSE_DB_POOL_ACQUIRE || 30000,
      idle: process.env.EXPENSE_DB_POOL_IDLE || 10000,
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

const modelsPath = path.join(__dirname, "models");
let models = fs.readdirSync(modelsPath).reduce((models, file) => {
  const filePath = path.join(modelsPath, file);
  const isDir = fs.lstatSync(filePath).isDirectory();

  if (file.indexOf(".") !== 0 && !isDir && file !== "index.js") {
    const model = require(filePath)(sequelize, Sequelize.DataTypes);
    console.log(`✅ Model loaded: ${model.name}`);
    return { ...models, [model.name]: model };
  }

  return models;
}, {});

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

const sequelizeLoader = async ({ app }) => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    app.Sequelize = Sequelize;
    app.sequelize = sequelize;

    console.log('🗄️ Database initialized...');

    app.models = { ...models, sequelize };

    console.log(`💡 Models initialized... (${Object.keys(models).length} models loaded)`);
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    throw err;
  }
};

module.exports = { sequelize, models, sequelizeLoader };
