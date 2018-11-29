const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const { DATABASE_URL } = require('../config');

const namespace = cls.createNamespace('sequelize-cls');
Sequelize.useCLS(namespace);
const db = new Sequelize(DATABASE_URL, { dialect: 'postgres', ssl: true, native: true });

const models = {
	db,
	Sequelize: Sequelize,
	// register models
	User: db.import(__dirname + '/User.js'),
	Flashcard: db.import(__dirname + '/flashcard.js')
};

models.User.prototype.validatePassword = function(password) {
	try {
		const isValid = bcrypt.compareSync(password, this.dataValues.password);
		return isValid;
	} catch (e) {
		return false;
	}
};

models.User.prototype.toJSON = function() {
	const values = { ...this.get() };
	delete values.password;
	delete values.id;
	return values;
};

module.exports = models;
