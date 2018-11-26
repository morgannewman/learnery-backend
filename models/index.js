const Sequelize = require('sequelize');
const { POSTGRES_DB_URL } = require('../config');

const db = new Sequelize(POSTGRES_DB_URL, { dialect: 'postgres' });

const models = {
  db,
  Sequelize: Sequelize,
	// register models
  User: db.import(__dirname + '/User.js')
};

module.exports = models;
