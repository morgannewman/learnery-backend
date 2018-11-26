require('dotenv').config();

module.exports = {
  POSTGRES_DB_URL: process.env.POSTGRES_DB_URL || 'postgresql://dev:@localhost/learnery',
  JWT_SECRET: 'this_is_not_a_secret',
  PORT: process.env.PORT || 8080
};
