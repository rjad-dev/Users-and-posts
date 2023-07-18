'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.Post, {foreignKey:'postId'})
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