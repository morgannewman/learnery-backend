const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const passport = require('passport');
const models = require('../models');
const { requireFields, constructObject, validateUser } = require('./helpers');
const { constructQueue } = require('../db/data');

// Setup passport authentication
const localAuth = passport.authenticate('local', {
  session: false,
  failWithError: true,
});
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});

const createAuthToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
  });
};

router.post(
  '/login',
  requireFields([ 'username', 'password' ]),
  validateUser,
  localAuth,
  (req, res, next) => {
    const result = { ...req.user, authToken: createAuthToken(req.user) };
    delete result.queue;
    return res.json(result);
  }
);

router.post('/refresh', jwtAuth, (req, res) => {
  const result = { ...req.user, authToken: createAuthToken(req.user) };
  return res.json(result);
});

router.post(
  '/register',
  requireFields([ 'username', 'password', 'email' ]),
  validateUser,
  async (req, res, next) => {
    const possibleFields = [ 'email', 'password', 'username' ];
    let userModel;
    try {
      // Create new user from body
      const newUser = constructObject(req, possibleFields);
      delete newUser.userId;
      newUser.username = newUser.username.trim();
      newUser.queue = constructQueue();
      userModel = await models.User.create(newUser);
    } catch (err) {
      if (err.original && err.original.code === '23505') {
        const message = err.original.messageDetail;
        if (message.includes('email'))
          err = new Error('That email is already taken');
        if (message.includes('username'))
          err = new Error('That username is already taken');
        err.status = 403;
      }
      return next(err);
    }
    // Copy and clean up data in new user model
    const user = { ...userModel.dataValues };
    delete user.id, delete user.password, delete user.queue;
    // Append an auth token to model
    user.authToken = createAuthToken(user);
    return res.status(201).json(user);
  }
);

module.exports = router;
