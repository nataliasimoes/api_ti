const Sequelize = require("sequelize");
const database = require("../db.js");

const Ocorrencia = database.define(
  "ocorrencia",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tecnicoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tecnico",
        key: "id",
      },
    },
    dataOcorrencia: {
      type: Sequelize.STRING
    },
    local: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: Sequelize.STRING,
  },
  {
    tableName: "ocorrencia",
  }
);

Ocorrencia.associate = function (models) {
  Ocorrencia.belongsTo(models.Tecnico);
};
module.exports = Ocorrencia;
