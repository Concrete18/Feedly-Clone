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

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Photo = sequelize.define('Photo', {
//     title: DataTypes.STRING,
//     userId: DataTypes.INTEGER,
//     albumId: DataTypes.INTEGER,
//     description: DataTypes.STRING,
//     imgUrl: DataTypes.STRING
//   }, {});
//   Photo.associate = function(models) {
//     Photo.belongsTo(models.Album, {foreignKey:'albumId'})
//     Photo.belongsTo(models.User, {foreignKey:'userId'})
//   };
//   return Photo;
// };
