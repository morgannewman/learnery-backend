const models = require('../models');

models.db
  .drop()
  .then(() => models.db.sync())
  .then(() => {
    models.Flashcard.create({ question: 'Are u nice', answer: 'no' });
    models.Flashcard.create({ question: 'Are u happy', answer: 'yes' });
    models.Flashcard.create({ question: 'Are u ambivalent', answer: 'maybe' });
    models.Flashcard.create({ question: 'Are u ?', answer: '?' });
    models.Flashcard.create({ question: 'Are u nice', answer: 'no' });
    models.Flashcard.create({ question: 'Are u happy', answer: 'yes' });
    models.Flashcard.create({ question: 'Are u ambivalent', answer: 'maybe' });
    models.Flashcard.create({ question: 'Are u ?', answer: '?' });
  })
  .then(res => console.log(res.dataValues))
  .then(() => models.db.close())
  .catch(err => console.log(err.original));

// models.User.findOne({
//   where: { email: 'email1@test.com' }
// }).then(res => {
//   if (!res) console.log('not found');
//   else {
//     console.log(res.dataValues);
//   }
// });
