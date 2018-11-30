const router = require('express').Router();
const models = require('../models/index.js');
const { requireFields } = require('./helpers');

router.get('/', async (req, res, next) => {
	const userModel = await models.User.findOne({
		where: {
			username: req.user.username
		}
	});
	const { stats: userStats, queue: cardStats } = userModel.dataValues;
	return res.json({ userStats, cardStats });
});

module.exports = router;
