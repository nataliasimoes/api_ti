const express = require('express');
const rotasEquipamento = require('./equipamento.js');
const rotasOcorrencia = require('./ocorrencia.js');
const rotasPeriferico = require('./periferico.js');
const rotasTecnico = require('./tecnico.js');

const router = express.Router();

router.use("/equipamento",rotasEquipamento);
router.use("/ocorrencia",rotasOcorrencia);
router.use("/periferico",rotasPeriferico);
router.use("/tecnico",rotasTecnico);

module.exports = router;