'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
      Comment.hasMany(models.Reply, {foreignKey: 'commentId', as: 'replies'})
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      allowNull:false,
      type:DataTypes.STRING
    },
    postId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {
        model:'Post',
        key: 'id',
      },
    },
    userId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {
        model:'User',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};