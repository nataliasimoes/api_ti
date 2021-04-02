const express = require('express');
const controladorTecnico = require('../controlador/tecnico.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorTecnico.listarTodos)
  //rota: POST /produto/
  .post(controladorTecnico.cadastrar);

router.route("/:id")
  //rota: GET /produto/:id (ex: /produto/1)
  .get(controladorTecnico.listarApenasUm)
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorTecnico.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorTecnico.alterar);

router.param('id', controladorTecnico.carregar);

module.exports = router;