const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const passport = require('passport');
const models = require('../models');
const { requireFields, constructObject, validateUser } = require('./helpers');

// Setup passport authentication
const localAuth = passport.authenticate('local', {
	session: false,
	failWithError: true
});
const jwtAuth = passport.authenticate('jwt', {
	session: false,
	failWithError: true
});

const createAuthToken = user => {
	return jwt.sign({ user }, JWT_SECRET, {
		subject: user.username,
		expiresIn: JWT_EXPIRY
	});
};

router.post('/login', requireFields(['username', 'password']), validateUser, localAuth, (req, res) => {
	const result = { ...req.user, authToken: createAuthToken(req.user) };
	delete result.queue;
	return res.json(result);
});

router.post('/refresh', jwtAuth, (req, res) => {
	const result = { ...req.user, authToken: createAuthToken(req.user) };
	return res.json(result);
});

router.post('/register', requireFields(['username', 'password', 'email']), validateUser, (req, res, next) => {
	const possibleFields = ['email', 'password', 'username'];

	return models.Flashcard.findAll({ attributes: ['id'] })
		.then(results => {
			// Build user object from req
			const newUser = constructObject(req, possibleFields);
			delete newUser.userId;
			newUser.username = newUser.username.trim();
			// Build queue from results
			let queue = results.map(result => result.dataValues.id);
			newUser.queue = queue;
			return models.User.create(newUser);
		})
		.then(_user => {
			const user = _user.dataValues;
			user.authToken = createAuthToken(user);
			delete user.id, delete user.password, delete user.queue;
			return res.status(201).json(user);
		})
		.catch(err => {
			if (err.original && err.original.code === '23505') {
				const message = err.original.detail;
				if (message.includes('email')) err = new Error('That email is already taken');
				if (message.includes('username')) err = new Error('That username is already taken');
				err.status = 403;
			}
			next(err);
		});
});

module.exports = router;
