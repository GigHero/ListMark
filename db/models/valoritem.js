'use strict';
module.exports = (sequelize, DataTypes) => {
  const ValorItem = sequelize.define('ValorItem', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
    idCompra: DataTypes.INTEGER,
    idItem: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL
  }, {freezeTableName: true ,timestamps: false});
  ValorItem.associate = function(models) {
    ValorItem.belongsTo(models.compra, {foreignKey: 'idCompra'})
    ValorItem.belongsTo(models.item, {foreignKey: 'idItem'})
  };
  return ValorItem;
};