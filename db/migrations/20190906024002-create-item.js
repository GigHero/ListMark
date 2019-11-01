'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Itens', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unidadeMedida: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Itens');
  }
};