'use strict';
module.exports = (sequelize, DataTypes) => {
  const ValorItem = sequelize.define('ValorItem', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
    idCompra: DataTypes.INTEGER,
    idItem: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL
  }, {});
  ValorItem.associate = function(models) {
    ValorItem.belongsTo(models.Compra, {foreignKey: 'idCompra'})
    ValorItem.belongsTo(models.Item, {foreignKey: 'idItem'})
  };
  return ValorItem;
};