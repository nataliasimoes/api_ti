const express = require('express');
const controladorOcorrencia = require('../controlador/ocorrencia.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorOcorrencia.listarTodos)
  //rota: POST /produto/
  .post(controladorOcorrencia.cadastrar);

router.route("/:id")
  //rota: GET /produto/:id (ex: /produto/1)
  .get(controladorOcorrencia.listarApenasUm)
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorOcorrencia.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorOcorrencia.alterar);

router.param('id', controladorOcorrencia.carregar);

module.exports = router;