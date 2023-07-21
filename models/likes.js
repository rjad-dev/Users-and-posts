'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {

      Like.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user' 
      });

      Like.belongsTo(models.Post, { 
        foreignKey: 'postId', as: 'post' 
      });

      Like.belongsToMany(models.User, {through:'Junction'})
    }
  }
  Like.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'User',
        key: 'id',
      },
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'Post',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};