/**
 * Validates if the request body contains all fields. Used as Express middleware.
 * @param {string[]} requiredFields - a field that must exist in the req.body to pass validation.
 * @param {number} status - an optional integer representing desired HTTP status if request fails.
 * @returns next()
 * @throws next(err)
 */
const requireFields = (requiredFields, status = 400) => (req, res, next) => {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      const err = new Error(`Missing \`${field}\` in request body.`);
      err.status = status;
      return next(err);
    }
  }
  return next();
};

/**
 * Contructs an object from the request body using an array of possible fields. Disallows fields with falsy values. Ensures userId is present in object body.
 * @param {string[]} fields - An array of possible fields in req.body.
 * @param {Object} req - The req object given by Express.
 * @returns {Object} an object with the correct userId and defined fields in req.body.
 */
const constructObject = (request, fields) => {
  const body = request.body;
  const userId = request.user && request.user.id;
  const result = { userId };
  for (const field of fields) {
    if (body[field] && field in body) {
      result[field] = body[field];
    }
  }
  return result;
};

/**
 * Makes sure a new user submission follows the submission rules.
 * Does NOT ensure a request object contains all necessary fields.
 * For that, use `requireFields()`
 *
 * 1. All inputs must be of type string
 * 2. All inputs must be truthy
 * 3. email and password must have no leading/trailing whitespace.
 * 4. Emails must be a valid email format
 * 5. Usernames must be between 2 and 16 characters
 * 6. Password must be between 8 and 32 characters
 */
const validateUser = (req, res, next) => {
	// Ensure inputs are strings and truthy
  const possibleFields = ['email', 'password', 'username'];
  for (const field of possibleFields) {
    if (field in req.body) {
      if (!field || typeof field !== 'string') {
        const err = new Error(`${field} must be of type string.`);
        err.status = 400;
        return next(err);
      }
    }
  }

	// Ensure no leading or trailing whitespace in email / password
  if (
    req.body.email &&
		(req.body.email[0] === ' ' ||
			req.body.email[req.body.email.length - 1] === ' ' ||
			req.body.password[0] === ' ' ||
			req.body.password[req.body.password.length - 1] === ' ')
  ) {
    const err = new Error('Email or password cannot begin or end with a space.');
    err.status = 400;
    return next(err);
  }

	// Ensure email is a valid email format
  if (req.body.email && !req.body.email.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/)) {
    const err = new Error('Malformed `email` in request body.');
    err.status = 400;
    return next(err);
  }

	// Ensure usernames are correct length
  if (req.body.username && (req.body.username.length < 2 || req.body.username.length > 16)) {
    const err = new Error('Username must be between 2 and 16 characters long.');
    err.status = 400;
    return next(err);
  }

	// Ensure passwords are correct length
  if (req.body.password && (req.body.password.length < 8 || req.body.password.length > 32)) {
    const err = new Error('Password must be between 8 and 72 characters long.');
    err.status = 400;
    return next(err);
  }

  return next();
};

module.exports = {
  requireFields,
  constructObject,
  validateUser
};
