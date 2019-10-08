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
  }, {tableName: 'Lista',timestamps: false});
  Lista.associate = function(models) {
    // associations can be defined here
  };
  return Lista;
};