const router = require('express').Router();
const models = require('../models/index.js');

router.get('/', (req, res, next) => {
  console.log(req.user);
  let { username } = req.user;
  models.User.findOne({
    where: {
      username
    }
  }).then(user => {
    console.log(user.dataValues.queue);
    let firstItemPosition = user.dataValues.queue[0];
    return models.Flashcard.findOne({
      where: {
        id: firstItemPosition
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

// router.post('/', (req, res, next) => {
//   let { answer } = req.body;

//   if(answer === 'Yikes') {

//   }

//   if(answer === 'Got It!') {

//   }
// });

module.exports = router;
