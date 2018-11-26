const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) =>
  sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(input) {
				// Must not be async or setter breaks
        this.setDataValue('password', bcrypt.hashSync(input, 10));
      }
    }
  });
