'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.Comment, {foreignKey: 'commentId', as: 'comment'})
    }
  }
  Reply.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reply: {
      allowNull:false,
      type: DataTypes.STRING
    },
    commentId:{
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Comment',
        key: 'id'
      },
    },
    userId:{
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
    },{
    sequelize,
    modelName: 'Reply',
  });
  return Reply;
};