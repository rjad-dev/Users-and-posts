'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      type:DataTypes.INTEGER
    },
    userId:{
      allowNull:false,
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};