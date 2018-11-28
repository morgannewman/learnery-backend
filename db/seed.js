const models = require('../models');
const { cards, users } = require('./data');

(async () => {
	await models.User.drop();
	await models.Flashcard.drop();
	await models.User.sync();
	await models.Flashcard.sync();
	// Seed users
	await Promise.all(users.map(user => models.User.create(user)));
	await Promise.all(cards.map(card => models.Flashcard.create(card)));
	models.db.close();
})();
