"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feed.hasMany(models.Source, {
        foreignKey: "feedId",
        onDelete: "CASCADE",
        hooks: true,
      });
      // Feed.belongsToMany(models.Source, {
      //   through: 'ArticleJoin',
      //   otherKey: 'feedId',
      //   foreignKey: 'sourceId'
      // })
      // Feed.belongsTo(models.Source_join, {foreignKey: 'feedId'})
    }
  }
  Feed.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Feed",
    }
  );
  return Feed;
};
