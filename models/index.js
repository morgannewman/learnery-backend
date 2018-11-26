const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const { POSTGRES_DB_URL } = require('../config');

const db = new Sequelize(POSTGRES_DB_URL, { dialect: 'postgres' });

const models = {
  db,
  Sequelize: Sequelize,
	// register models
  User: db.import(__dirname + '/User.js')
};

models.User.prototype.validatePassword = function(password) {
  try {
    const isValid = bcrypt.compareSync(password, this.dataValues.password);
    return isValid;
  } catch (e) {
    return false;
  }
};

module.exports = models;
