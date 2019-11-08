'use strict';
module.exports = {
  up: (queryInterface, Sequelize, DataTypes) => {
    return queryInterface.createTable('ValorItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCompra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Compra hasMany Item n:n
          model: 'Compra',
          key: 'id'
        }
      },
      idItem: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Item hasMany Compra n:n
          model: 'Item',
          key: 'id'
        }
      },
      preco: {
        type: Sequelize.DECIMAL(10,2)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ValorItems');
  }
};