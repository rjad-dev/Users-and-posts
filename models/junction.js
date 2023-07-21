'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Junction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Junction.init({
    userId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {
        model:'User',
        key: 'id',
      },
    },
    postId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {
        model:'User',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Junction',
  });
  return Junction;
};