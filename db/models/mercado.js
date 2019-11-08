'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mercado = sequelize.define('Mercado', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }}
  }, {timestamps: false});
  Mercado.associate = function(models) {
    Mercado.belongsToMany(models.Lista, {through: 'Compra', foreignKey: 'idMercado', as: 'Listas'})
  };
  return Mercado;
};