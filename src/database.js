const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Create a new Sequelize instance
const sequelize = new Sequelize(
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  { dialect: 'postgres', logging: false }
);

// Authenticate with the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Synchronize models with the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing models:', err);
  });

module.exports = sequelize;
