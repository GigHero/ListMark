'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Lista = sequelize.define('Lista', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    data: {type: DataTypes.DATE, allowNull: false, validate: { notEmpty: true } },
    dataFormatada: {
      type: DataTypes.VIRTUAL,
      get() {
        let date = moment(this.getDataValue('data'));
        return date.format('DD/MM/YYYY');
      }
    }
  }, {freezeTableName: true ,timestamps: false});
  Lista.associate = function(models) {
    Lista.belongsToMany(models.mercado, {through: 'Compra', foreignKey: 'idLista', as: 'Mercados'})
    Lista.belongsTo(models.compra, {foreignKey: 'idLista'})
  };
  return Lista;
};