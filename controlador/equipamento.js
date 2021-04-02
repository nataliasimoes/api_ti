const { Equipamento } = require("../modelos");

function listarTodos(req, res, next) {
  Equipamento.findAll().then(function (listaEquipamentos) {
    res.json(listaEquipamentos);
  });
}

function cadastrar(req, res, next) {
  Equipamento.create({
    tombo: req.body.tombo,
    tipoEquipamento: req.body.tipoEquipamento,
    marcaEquipamento: req.body.marcaEquipamento,
    local: req.body.local,
    funciona: req.body.funciona


  })
    .then((equipamento) => {
      res.json(equipamento);
    })
    .catch((err) => {
      res.status(401).json({ error: "O técnico não foi cadastrado" });
    });
}

function listarApenasUm(req, res, next) {
  if (req.equipamento) {
    res.json(req.equipamento);
  } else {
    res.status(404).json({
      message: "O equipamento informado não existe",
    });
  }
}

function alterar(req, res) {
  //verifica se o técnico informado pelo id existe
  if (req.equipamento) {
    const tombo = req.body.tombo || req.equipamento.tombo;
    const tipoEquipamento = req.body.tipoEquipamento || req.equipamento.tipoEquipamento;
    const marcaEquipamento = req.body.marcaEquipamento || req.equipamento.marcaEquipamento;
    const local = req.body.local || req.equipamento.local;
    const funciona = req.body.funciona || req.equipamento.funciona;
    Equipamento.update(
      { tombo, tipoEquipamento, marcaEquipamento, local, funciona  },
      {
        where: {
          id: req.equipamento.id
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
  if (req.equipamento) {
    Equipamento.destroy({
      where: {
        tombo: req.equipamento.tombo,
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
  Equipamento.findOne({
    where: {
      tombo: tombo,
    },
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (produto) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((equipamento) => {
      //armena o equipamento na requisição, para que a próxima função
      //consiga recuperá-lo
      req.equipamento = equipamento;
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
