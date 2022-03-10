'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  member.init({
    id_member: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    nama_member: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    jenis_kelamin: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'member',
    tableName: 'member',
  });
  return member;
};