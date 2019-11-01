'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mercado = sequelize.define('Mercado', {
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true }}
  }, {timestamps: false});
  Mercado.associate = function(models) {
    Mercado.belongsToMany(models.Lista, {through: 'Compra', foreignKey: 'idMercado', as: 'Listas'})
  };
  return Mercado;
};