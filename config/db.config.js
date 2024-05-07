const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    port: process.env.PGPORT,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  }
);

const initDb = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
};

module.exports = { initDb, sequelize };
