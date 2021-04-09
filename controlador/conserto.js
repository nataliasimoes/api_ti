const { Conserto } = require("../modelos");

function listarTodos(req, res, next) {
  Conserto.findAll().then(function (listaConsertos) {
    res.json(listaConsertos);
  });
}

function cadastrar(req, res, next) {
  Conserto.create({
    dataChegada: req.body.dataChegada,
    dataSaida: req.body.dataSaida,
    tipo: req.body.tipo,
    tombo: req.body.tombo,
    local: req.body.local

  })
    .then((conserto) => {
      res.json(conserto);
    })
    .catch((err) => {
      res.status(401).json({ error: "O técnico não foi cadastrado" });
    });
}


function alterar(req, res) {
  if (req.equipamento) {
    const dataChegada = req.body.dataChegada || req.equipamento.dataChegada;
    const dataSaida = req.body.dataSaida || req.equipamento.dataSaida;
    const local = req.body.local || req.equipamento.local;
    const tipo = req.body.tipo || req.equipamento.tipo;
    const tombo = req.body.tombo || req.equipamento.tombo;
    Equipamento.update(
      { dataChegada, dataSaida, local, tipo, tombo  },
      {
        where: {
          id: req.conserto.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações do equipamento não foram altedas",
    });
  }
}

function remover(req, res, next) {
  if (req.conserto) {
    Conserto.destroy({
      where: {
        id: req.conserto.id,
      },
    }).then(() => {
      res.status(200).json({
        message: "Removido",
      });
    }).catch((err) => {
      res.status(401).json({ error: "O equipamento não foi removido" });
    });
  } else {
    res.status(404).json({
      message: "Não foi possível remover",
    });
  }
}


function carregar(req, res, next, tombo) {
  Conserto.findOne({
    where: {
      id: id,
    },
  })
    .then((conserto) => {
      req.conserto = conserto;
      next();
    });
}

module.exports = {
  listarTodos,
  cadastrar,
  alterar,
  remover,
  carregar,
};
