const express = require('express');
const controladorPeriferico = require('../controlador/periferico.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorPeriferico.listarTodos)
  //rota: POST /produto/
  .post(controladorPeriferico.cadastrar);

router.route("/:id")
  //rota: GET /produto/:id (ex: /produto/1)
  .get(controladorPeriferico.listarApenasUm)
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorPeriferico.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorPeriferico.alterar);

router.param('id', controladorPeriferico.carregar);

module.exports = router;