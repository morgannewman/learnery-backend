const models = require('../models');

models.db
  .drop()
  .then(() => models.db.sync())
  .then(() => {
    models.User.create({ username: 'potato1', email: 'email1@test.com', password: 'password' });
    models.User.create({ username: 'tomato2', email: 'email2@test.com', password: 'password' });
    const test = models.User.create({ username: 'brosato3', email: 'email3@test.com', password: 'password' });
    test.test();
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
