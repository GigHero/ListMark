'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } }
  }, {tableName: 'Itens', timestamps: false});
  Item.associate = function (models) {
    // associations can be defined here
  };
  return Item;
};