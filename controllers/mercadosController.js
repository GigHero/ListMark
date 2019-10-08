const Mercado = require('../db').Mercado;

exports.postNovoMercado = (req, res, next) => {
  Mercado.create(req.body)
    .then((mercado) => {
      res.redirect('/mercados');
    }).catch(console.error);
};

exports.getNovoMercado = (req, res, next) => {
  res.render('mercado/novaMercado', {
    linkAtivo: 'mercado',
    formAction: '/mercados/novo',
    mercado: Mercado.build({}),
  });
};

exports.getMercados = (req, res, next) => {
  Mercado.findAll().then(mercados => {
    res.render('mercado/listaMercados', {
      linkAtivo: 'mercados',
      mercados: mercados
    });
  }).catch(console.error);
};

exports.getEditarMercado = (req, res, next) => {
  let mercadoId = req.params.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    res.render('mercado/editarMercados', {
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
    res.redirect('/mercados');
  }).catch(console.error);
};

exports.postEditarMercado = (req, res, next) => {
  let mercadoId = req.params.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    mercado.update(req.body).then(() => {
      res.redirect('/mercados');
    });
  }).catch(console.error);
};