const Sequelize = require('sequelize');
const database = require('../db.js');

const Conserto = database.define('conserto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataChegada: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataSaida: {
        type: Sequelize.STRING,
    },
    tipo: {
        type: Sequelize.STRING
     },
    tombo: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    local: {
        type: Sequelize.STRING,
        allowNull: false
     },

}, {
    tableName: 'conserto'
  })

Conserto.associate = function(models) {
}
module.exports = Conserto;