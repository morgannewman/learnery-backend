require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dev:@localhost/learnery',
  JWT_SECRET: process.env.JWT_SECRET || 'this_is_not_a_secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  PORT: process.env.PORT || 8080
};
