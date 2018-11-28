const router = require('express').Router();
const models = require('../models/index.js');

router.get('/', (req, res, next) => {
	let user;
	models.User.findOne({
		where: {
			username: req.user.username
		}
	}).then(_user => {
		user = _user;
		console.log(user.dataValues.queue);
		let nextId = user.dataValues.queue[0].id;
		return models.Flashcard.findOne({
			where: {
				id: nextId
			}
		}).then(card => {
			let flashC = {
				question: card.dataValues.question,
				answer: card.dataValues.answer
			};
			res.json(flashC);
		});
	});
});

function constructNewQueue(queue, M = null) {
	const top = { ...queue[0] };
	// Set M to be M*2 or the given M
	if (!M) M = top.M *= 2;
	top.M = M;
	return [...queue.slice(1, M), top, ...queue.slice(M)];
}

router.post('/', async (req, res, next) => {
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
