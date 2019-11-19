'use strict';
module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('Compra', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
    idLista: DataTypes.INTEGER,
    idMercado: DataTypes.INTEGER,
  }, {freezeTableName: true ,timestamps: false});
  Compra.associate = function(models)  {
    Compra.belongsTo(models.lista, {foreignKey: 'idLista'})
    Compra.belongsTo(models.mercado, {foreignKey: 'idMercado'})
    Compra.belongsToMany(models.item, {through: 'ValorItem', foreignKey: 'idCompra', as: 'ItensValor'})
  };
  return Compra;
};