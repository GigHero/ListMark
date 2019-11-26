const Mercado = require('../db').Mercado;

exports.postNovoMercado = (req, res, next) => {
  Mercado.create(req.body)
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

exports.getNovoMercado = (req, res, next) => {
  res.json({
    linkAtivo: 'mercados',
    formAction: '/mercados/novo',
    mercado: Mercado.build({}),
  });
};

exports.getMercados = (req, res, next) => {
  Mercado.findAll().then(mercados => {
    res.json({
      linkAtivo: 'mercados',
      mercados: mercados
    });
  }).catch(console.error);
};

exports.getEditarMercado = (req, res, next) => {
  let mercadoId = req.params.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    res.json({
      linkAtivo: 'mercados',
      formAction: '/mercados/editar/' + mercadoId,
      mercado: mercado
    });
  }).catch(console.error);
};

exports.postExcluirMercado = (req, res, next) => {
  let mercadoId = req.body.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    return mercado.destroy();
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

exports.postEditarMercado = (req, res, next) => {
  let mercadoId = req.params.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    mercado.update(req.body).then(() => {
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