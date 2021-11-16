'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Feeds.init({
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feeds',
  });
  return Feeds;
};