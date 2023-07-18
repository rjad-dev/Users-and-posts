'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {
      Like.belongsTo(models.Post, {foreignKey:'postId', as:'post'})
      Like.belongsTo(models.User, {foreignKey:'userId', as:'user'})
    }
  }
  Like.init({
    isLiked: {
      allowNull: false,
      defaultValue:false,
      type: DataTypes.BOOLEAN
    },

    postId:{
      allowNull:false,
      type:DataTypes.INTEGER
    },

    userID:{
      allowNull:false,
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};