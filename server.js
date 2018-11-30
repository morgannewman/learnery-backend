// npm modules
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const Sequelize = require('sequelize');
// config
const { PORT } = require('./config');
// auth strategies
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

// routers
const authRouter = require('./routes/auth.router');
const flashCardRouter = require('./routes/flashcard.router');
const statsRouter = require('./routes/stats.router');
// Create an Express application
const app = express();

// Log all requests. Skip logging during
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
    skip: () => process.env.NODE_ENV === 'test'
  })
);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  })
);
app.use(compress());
// Parse request body
app.use(express.json());

// Mount auth strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

// Mount routers
app.use('/auth', authRouter);
// Protect all /api endpoints
app.use('/api', passport.authenticate('jwt', { session: false, failWithError: true }));
app.use('/api/flashcard', flashCardRouter);
app.use('/api/stats', statsRouter);

// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

if (require.main === module) {
  app.listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
    console.log('Is the postgres service running? Try $ pg_ctl start');
  });
}

module.exports = app; // Export for testing
