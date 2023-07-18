'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
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
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};