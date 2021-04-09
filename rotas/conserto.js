const express = require('express');
const controladorConserto = require('../controlador/conserto.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorConserto.listarTodos)
  //rota: POST /produto/
  .post(controladorConserto.cadastrar);

router.route("/:id")
  //rota: GET /produto/:id (ex: /produto/1)
  .get(controladorConserto.listarApenasUm)
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorConserto.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorConserto.alterar);

router.param('id', controladorConserto.carregar);

module.exports = router;