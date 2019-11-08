'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.js')[env];

/** @type {Sequelize} */
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**@type {Sequelize.Model} */
const Item = sequelize.import(__dirname + '/models/item.js');
const Lista = sequelize.import(__dirname + '/models/lista.js');
const Mercado = sequelize.import(__dirname + '/models/mercado.js');
const Compra = sequelize.import(__dirname + '/models/compra.js');
const ValorItem = sequelize.import(__dirname + '/models/valoritem.js');

module.exports = {
  Sequelize,
  sequelize,
  Item,
  Lista,
  Mercado,
  Compra,
  ValorItem,
};