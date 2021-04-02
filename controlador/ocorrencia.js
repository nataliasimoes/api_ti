const { Ocorrencia } = require("../modelos");

function listarTodos(req, res, next) {
  Ocorrencia.findAll().then(function (listaOcorrencia) {
    res.json(listaOcorrencia);
  });
}

function cadastrar(req, res, next) {
  Ocorrencia.create({
    tecnicoId: req.body.tecnicoId,
    dataOcorrencia: req.body.dataOcorrencia,
    local: req.body.local,
    descricao: req.body.descricao,

  })
    .then((ocorrencia) => {
      res.json(ocorrencia);
    })
    .catch((err) => {
      res.status(401).json({ error: "O técnico não foi cadastrado" });
    });
}

function listarApenasUm(req, res, next) {
  if (req.ocorrencia) {
    res.json(req.ocorrencia);
  } else {
    res.status(404).json({
      message: "O ocorrencia informado não existe",
    });
  }
}

function alterar(req, res) {
  //verifica se o técnico informado pelo id existe
  if (req.ocorrencia) {
    const tecnicoId = req.body.tecnicoId || req.ocorrencia.tecnicoId;
    const dataOcorrencia = req.body.dataOcorrencia || req.ocorrencia.dataOcorrencia;
    const local = req.body.local || req.ocorrencia.local;
    const descricao = req.body.descricao || req.ocorrencia.descricao;
    Ocorrencia.update(
      { tecnicoId, dataOcorrencia, local, descricao  },
      {
        where: {
          id: req.ocorrencia.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações do ocorrencia não foram altedas",
    });
  }
}

function remover(req, res, next) {
  if (req.ocorrencia) {
    Ocorrencia.destroy({
      where: {
        id: req.ocorrencia.id,
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
  Ocorrencia.findOne({
    where: {
      id: id,
    },
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (produto) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((ocorrencia) => {
      //armena o ocorrencia na requisição, para que a próxima função
      //consiga recuperá-lo
      req.ocorrencia = ocorrencia;
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
