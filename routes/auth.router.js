const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const passport = require('passport');
const models = require('../models');
const { requireFields, constructObject, validateUser } = require('./helpers');

// Setup passport authentication
const localAuth = passport.authenticate('local', { session: false, failWithError: true });
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

const createAuthToken = user => {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
};

router.post('/login', requireFields(['username', 'password']), validateUser, localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  return res.json({ authToken });
});

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

router.post('/register', requireFields(['username', 'password', 'email']), validateUser, (req, res, next) => {
  const possibleFields = ['email', 'password', 'username'];
  const newUser = constructObject(req, possibleFields);
  delete newUser.userId;
  newUser.username = newUser.username.trim();

  return models.User.create(newUser)
    .then(user => res.status(201).json(user))
    .catch(err => {
      if (err.original && err.original.code === '23505') {
        err = new Error('That username is already taken');
        err.status = 403;
      }
      next(err);
    });
});

module.exports = router;
