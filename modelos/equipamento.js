const Sequelize = require('sequelize');
const database = require('../db.js');

const Equipamento = database.define('equipamento', {
    tombo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tipoEquipamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marcaEquipamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    local: {
        type: Sequelize.STRING,
    },
    funciona: {
        type: Sequelize.BOOLEAN
     }
}, {
    tableName: 'equipamento'
  })

Equipamento.associate = function(models) {
}
module.exports = Equipamento;