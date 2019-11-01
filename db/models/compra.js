'use strict';
module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('Compra', {
    idLista: DataTypes.INTEGER,
    idMercado: DataTypes.INTEGER
  }, {});
  Compra.associate = function(models)  {
    Compra.belongsTo(models.Lista, {foreignKey: 'idLista'})
    Compra.belongsTo(models.Mercado, {foreignKey: 'idMercado'})
    Compra.belongsToMany(models.Item, {through: 'ValorItem', foreignKey: 'idCompra', as: 'ItensValor'})
  };
  return Compra;
};