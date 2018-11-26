const { Strategy: LocalStrategy } = require('passport-local');
const models = require('../models');

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy((username, password, done) => {
  models.User.findOne({ where: { username } })
    .then(userModel => {
			// Ensure user exists
      if (!userModel) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email',
          location: 'email'
        });
      }
      const user = userModel.dataValues;
			// Ensure input password matches user password
      const isValid = userModel.validatePassword(password);
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
			// Add `user` to the request object
      return done(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
      return done(err);
    });
});

module.exports = localStrategy;
