const models = require('../models');

const username = 'potato1';
const password = 'password2';

models.User.findOne({ where: { username } }).then(userModel => {
  const isValid = userModel.validatePassword(password);
  if (!isValid) {
    return Promise.reject({
      reason: 'LoginError',
      message: 'Incorrect password',
      location: 'password'
    });
  }
  return console.log('success!');
});
// console.log(user);
