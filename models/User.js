const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) =>
  sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^(\w|-|_){2,16}$/i // allows alphanumeric, -, _ from 2-16 length
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      set(input) {
				// Must not be async or setter breaks
        this.setDataValue('password', bcrypt.hashSync(input, 10));
      }
    }
  });
