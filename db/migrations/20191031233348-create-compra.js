'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Compra', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idLista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Lista hasMany Mercado n:n
          model: 'Lista',
          key: 'id'
        }
      },
      idMercado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Mercado hasMany Lista n:n
          model: 'Mercado',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Compra');
  }
};