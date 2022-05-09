//create tabel outlet + relasi

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user"
      })
    }
  };
  outlet.init({
    id_outlet: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    id_user: DataTypes.INTEGER,
    alamat: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet',
  });
  return outlet;
};