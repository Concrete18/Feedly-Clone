'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Saved.belongsTo(models.Article, {
        foreignKey:'articleId',
        onDelete: 'CASCADE'
      })
    }
  };
  Saved.init({
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Saved',
  });
  return Saved;
};
