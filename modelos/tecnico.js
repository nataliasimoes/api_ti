const Sequelize = require('sequelize');
const database = require('../db.js');

const Tecnico = database.define('tecnico', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
       type: Sequelize.NUMBER,
       allowNull: false
    }
}, {
    tableName: 'tecnico'
  })

Tecnico.associate = function(models) {
}
module.exports = Tecnico;