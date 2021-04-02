const { Periferico } = require("../modelos");

function listarTodos(req, res, next) {
  Periferico.findAll().then(function (listaPeriferico) {
    res.json(listaPeriferico);
  });
}

function cadastrar(req, res, next) {
  Periferico.create({
    tipoPeriferico: req.body.tipoPeriferico,
    quantidade: req.body.quantidade,
    disponivel: req.body.disponivel,

  })
    .then((periferico) => {
      res.json(periferico);
    })
    .catch((err) => {
      res.status(401).json({ error: "O técnico não foi cadastrado" });
    });
}

function listarApenasUm(req, res, next) {
  if (req.periferico) {
    res.json(req.periferico);
  } else {
    res.status(404).json({
      message: "O periferico informado não existe",
    });
  }
}

function alterar(req, res) {
  //verifica se o técnico informado pelo id existe
  if (req.periferico) {
    const tipoPeriferico = req.body.tipoPeriferico || req.periferico.tipoPeriferico;
    const quantidade = req.body.quantidade || req.periferico.quantidade;
    const disponivel = req.body.disponivel || req.periferico.disponivel;
    Periferico.update(
      { tipoPeriferico, quantidade, disponivel  },
      {
        where: {
          id: req.periferico.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações do periferico não foram altedas",
    });
  }
}

function remover(req, res, next) {
  if (req.periferico) {
    Periferico.destroy({
      where: {
        id: req.periferico.id,
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
  Periferico.findOne({
    where: {
      id: id,
    },
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (produto) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((periferico) => {
      //armena o periferico na requisição, para que a próxima função
      //consiga recuperá-lo
      req.periferico = periferico;
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
