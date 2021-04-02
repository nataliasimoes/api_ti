const Sequelize = require('sequelize');
const database = require('../db.js');

const Periferico = database.define('periferico', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipoPeriferico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
       type: Sequelize.INTEGER,
       allowNull: false
    },
    disponivel: {
        type: Sequelize.BOOLEAN
     }
    
}, {
    tableName: 'periferico'
  })

Periferico.associate = function(models) {
}
module.exports = Periferico;