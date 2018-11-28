module.exports = (sequelize, DataTypes) =>
  sequelize.define('flashcards', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    question: { type: DataTypes.STRING },
    answer: { type: DataTypes.STRING }
  });
