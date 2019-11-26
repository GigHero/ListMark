const Lista = require('../db').Lista;

exports.postNovaLista = (req, res, next) => {
  Lista.create(req.body)
    .then(() => {
      res.json({
        funcionou: true
      });
    }).catch(function(e) {
      console.error(e);
      res.json({
        funcionou: false
      })
    })
};

exports.getNovaLista = (req, res, next) => {
  res.json({
    linkAtivo: 'lista',
    formAction: '/listas/nova',
    lista: Lista.build({}),
  });
};

exports.getListas = (req, res, next) => {
  Lista.findAll().then(listas => {
    res.json({
      linkAtivo: 'listas',
      listas: listas
    });
  }).catch(console.error);
};

exports.getEditarLista = (req, res, next) => {
  let listaId = req.params.listaId;
  Lista.findByPk(listaId).then(lista => {
    res.json({
      linkAtivo: 'listas',
      formAction: '/listas/editar/' + listaId,
      lista: lista
    });
  }).catch(console.error);
};

exports.postExcluirLista = (req, res, next) => {
  let listaId = req.body.listaId;
  Lista.findByPk(listaId).then(lista => {
    return lista.destroy();
  }).then(() => {
    res.json({
      funcionou: true
    });
  }).catch(function(e) {
    console.error(e);
    res.json({
      funcionou: false
    })
  })
};

exports.postEditarLista = (req, res, next) => {
  let listaId = req.params.listaId;
  Lista.findByPk(listaId).then(lista => {
    lista.update(req.body).then(() => {
      res.json({
        funcionou: true
      });
    }).catch(function(e) {
      console.error(e);
      res.json({
        funcionou: false
      })
    })
})
};