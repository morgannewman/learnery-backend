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
	return res.json({ card, stats: user.dataValues.queue[0].stats });
});

// Data model defined in db/data.js
function constructNewQueue(queue, isCorrect) {
	const top = { ...queue[0] };
	// Set M to be M*2 or the given M
	let M;
	if (isCorrect) M = top.M * 2;
	else M = 1;
	top.M = M;
	return [...queue.slice(1, M + 1), top, ...queue.slice(M + 1)];
}

function updateUserStats(stats, isCorrect) {
	/* 
	stats: {
		type: DataTypes.JSONB,
		allowNull: false,
		defaultValue: {
			streak: 0,
			maxStreak: 0,
			lastSeen: null,
			secondsSpentAnswering: 0,
			cardsAnswered: 0
		}
	}
	*/
	if (isCorrect) {
		stats.streak++;
		if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
	} else {
		stats.streak = 0;
	}
	stats.cardsAnswered++;
	stats.lastSeen = new Date().toISOString(); // UTC String
}

function updateCardStats(card, isCorrect) {
	/**
	 * Defined in db/data.js
		 stats: {
		 	 timesCorrect: 0,
		 	 timesIncorrect: 0,
		 	 streak: 0,
			 maxStreak: 0
		 }
	*/
	const stats = card.stats; // this is an obj so call-by-ref
	if (isCorrect) {
		stats.timesCorrect++;
		stats.streak++;
		if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
	} else {
		stats.timesIncorrect++;
		stats.streak = 0;
	}
	stats.timesSeen++;
	stats.lastSeen = new Date().toISOString(); // UTC String
}

router.post('/', requireFields(['confidence']), async (req, res, next) => {
	// Find user
	const userModel = await models.User.findOne({
		where: {
			username: req.user.username
		}
	});
	// Grab their queue
	let { queue, stats } = userModel.dataValues;
	// Construct new queue based on their answer
	const { confidence } = req.body;
	const first = queue[0];
	switch (confidence) {
		case '0':
			updateCardStats(first, false);
			queue = constructNewQueue(queue, false);
			updateUserStats(stats, false);
			break;
		case '1':
			updateCardStats(first, true);
			queue = constructNewQueue(queue, true);
			updateUserStats(stats, true);
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
	return res.json({ flashcard, stats: queue[0].stats });
});

module.exports = router;
