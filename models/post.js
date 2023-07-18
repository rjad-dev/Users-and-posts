'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Post.hasMany(models.Comment, {foreignKey: 'postId', as: 'comments'})
      Post.hasMany(models.Reply, {foreignKey: 'postId', as: 'replies'})
    }
  }
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      allowNull:false,
      type: DataTypes.STRING
    },
    
    userId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {
        model:'User',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};