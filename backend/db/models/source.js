'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Source.belongsTo(models.Feed, {foreignKey:'feedId'})
      // const eventColumnMapping = {
      //   through: "RSVPs",
      //   otherKey: "eventId",
      //   foreignKey: "userId",
      //   as: "reservations",
      // }
    }
  };
  Source.init({
    feedId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};
