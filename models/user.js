'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      User.hasMany(models.Post, { 
        foreignKey: 'userId', as: 'posts' 
      });
      
      User.hasMany(models.Comment, {
        foreignKey: 'userId', as: 'comments' 
      });
    
      User.hasMany(models.Reply, {
        foreignKey: 'userId', as: 'replies' 
      });

      User.hasMany(models.Like,{
        foreignKey:'userId',
        as:'user'
      })

      User.belongsToMany(models.Like,{through:'Junction'})
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name:{ 
      allowNull:false,
      type: DataTypes.STRING
    },

    email: {
      allowNull:false,
      type:DataTypes.STRING
    },
    isVerified:{
      allowNull:false,
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    verificationCode:{
      allowNull:false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};