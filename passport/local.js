const { Strategy: LocalStrategy } = require('passport-local');
const models = require('../models');

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const userModel = await models.User.findOne({ where: { username } });
		// Ensure user exists
		if (!userModel) {
			throw {
				reason: 'LoginError',
				message: 'Incorrect email',
				location: 'email'
			};
		}
		// Ensure input password matches user password
		const isValid = userModel.validatePassword(password);
		if (!isValid) {
			throw {
				reason: 'LoginError',
				message: 'Incorrect password',
				location: 'password'
			};
		}
		// Add `user` to the request object
		const user = userModel.dataValues;
		delete user.password;
		delete user.id;
		return done(null, user);
	} catch (err) {
		if (err.reason === 'LoginError') {
			return done(null, false);
		}
		return done(err);
	}
});

module.exports = localStrategy;
