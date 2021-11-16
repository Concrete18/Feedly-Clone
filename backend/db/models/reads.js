'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reads.init({
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reads',
  });
  return Reads;
};