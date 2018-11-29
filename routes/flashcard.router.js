const router = require('express').Router();
const models = require('../models/index.js');
const { requireFields } = require('./helpers');

router.get('/', async (req, res, next) => {
	const user = await models.User.findOne({
		where: {
			username: req.user.username
		}
	});
	const card = await models.Flashcard.findOne({
		where: {
			id: user.dataValues.queue[0].id
		}
	});
	return res.json(card);
});

function constructNewQueue(queue, M = null) {
	const top = { ...queue[0] };
	// Set M to be M*2 or the given M
	if (!M) M = top.M *= 2;
	top.M = M;
	return [...queue.slice(1, M + 1), top, ...queue.slice(M + 1)];
}

router.post('/', requireFields(['confidence']), async (req, res, next) => {
	// Find user
	const userModel = await models.User.findOne({
		where: {
			username: req.user.username
		}
	});
	// Grab their queue
	let { queue } = userModel.dataValues;
	// Construct new queue based on their answer
	const { confidence } = req.body;
	switch (confidence) {
		case '0':
			queue = constructNewQueue(queue, 1);
			break;
		case '1':
			queue = constructNewQueue(queue);
			break;
	}
	// send user new item
	// update DB with new queue
	const [flashcard] = await Promise.all([
		models.Flashcard.findOne({ where: { id: queue[0].id } }),
		userModel.update(
			{ queue },
			{
				where: {
					username: req.user.username
				},
				fields: ['queue'],
				returning: false
			}
		)
	]);
	return res.json(flashcard);
});

module.exports = router;
