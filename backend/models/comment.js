'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: 'idUSERS'
      });
      models.Comment.belongsTo(models.Message, {
        foreignKey: 'idPOSTS'
      })
    }
  }
  Comment.init({
    idUSERS: DataTypes.INTEGER,
    idPOSTS: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
