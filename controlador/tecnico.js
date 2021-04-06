const { Tecnico } = require("../modelos");

function listarTodos(req, res, next) {
  Tecnico.findAll().then(function (listaTecnicos) {
    res.json(listaTecnicos);
  });
}

function cadastrar(req, res, next) {
  Tecnico.create({
    nome: req.body.nome,
    telefone: req.body.telefone

  })
    .then((tecnico) => {
      res.json(tecnico);
    })
    .catch((err) => {
      res.status(401).json({ error: "O técnico não foi cadastrado" });
    });
}

function listarApenasUm(req, res, next) {
  if (req.tecnico) {
    res.json(req.tecnico);
  } else {
    res.status(404).json({
      message: "O tecnico informado não existe",
    });
  }
}

function alterar(req, res) {
  //verifica se o técnico informado pelo id existe
  if (req.tecnico) {
    const nome = req.body.nome || req.tecnico.nome;
    const telefone = req.body.telefone || req.tecnico.telefone;
    Tecnico.update(
      { nome, telefone, formacao, foto  },
      {
        where: {
          id: req.tecnico.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações do técnico não foram altedas",
    });
  }
}

function remover(req, res, next) {
  if (req.tecnico) {
    Tecnico.destroy({
      where: {
        id: req.tecnico.id,
      },
    }).then(() => {
      res.status(200).json({
        message: "Removido",
      });
    });
  } else {
    res.status(404).json({
      message: "Não foi possível remover",
    });
  }
}

/**
 *
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Tecnico.findOne({
    where: {
      id: id,
    },
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (produto) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((tecnico) => {
      //armena o tecnico na requisição, para que a próxima função
      //consiga recuperá-lo
      req.tecnico = tecnico;
      next();
    });
}

module.exports = {
  listarTodos,
  cadastrar,
  listarApenasUm,
  alterar,
  remover,
  carregar,
};
