const Equipamento = require("./equipamento.js");
const Ocorrencia = require("./ocorrencia.js");
const Periferico = require("./periferico.js");
const Tecnico = require("./tecnico.js");
const Conserto = require("./conserto.js");


const modelos = {
  Equipamento,
  Ocorrencia,
  Periferico,
  Tecnico,
  Conserto

};

Object.entries(modelos).forEach(([name,model]) => {
  model.sync();
  model.associate(modelos);
  console.log(name);
})


module.exports = {
  Equipamento,
  Ocorrencia,
  Periferico,
  Tecnico,
  Conserto

}