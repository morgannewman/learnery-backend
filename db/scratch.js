const models = require('../models');

const username = 'potato1';
const password = 'password';

// models.User.findOne({ where: { username } }).then(userModel => {
// 	// Ensure user exists
//   if (!userModel) {
//     return Promise.reject({
//       reason: 'LoginError',
//       message: 'Incorrect email',
//       location: 'email'
//     });
//   }
// 	// Ensure input password matches user password
//   const isValid = userModel.validatePassword(password);
//   if (!isValid) {
//     return Promise.reject({
//       reason: 'LoginError',
//       message: 'Incorrect password',
//       location: 'password'
//     });
//   }
// 	// Add `user` to the request object
//   const user = userModel.dataValues;
// 	// delete user.password;
//   return console.log(user);
// });
//

models.Flashcard.findAll({ attributes: ['id'] }).then(results => {
  let queue = results.map(result => result.dataValues.id);
  console.log(queue);
});

// models.Flashcard.findAll().then(results => {
//   console.log(results, 'LINE 36');
// });
