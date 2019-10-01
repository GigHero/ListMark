const Mercado = require('../db').Mercado;

exports.postNovaMercado = (req, res, next) => {
  Mercado.create(req.body)
    .then((mercado) => {
      res.redirect('/mercado');
    }).catch(console.error);
};

exports.getNovaMercado = (req, res, next) => {
  res.render('mercado/novaMercado', {
    linkAtivo: 'mercado',
    formAction: '/mercado/nova',
    mercado: Mercado.build({}),
  });
};

exports.getMercados = (req, res, next) => {
  Mercado.findAll().then(mercados => {
    res.render('mercado/listaMercados', {
      linkAtivo: 'mercados',
      mercado: mercado
    });
  }).catch(console.error);
};

exports.getEditarMercado = (req, res, next) => {
  let mercadoId = req.params.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    res.render('mercado/editarMercado', {
      linkAtivo: 'mercado',
      formAction: '/mercado/editar/' + MercadoId,
      mercado: mercado
    });
  }).catch(console.error);
};

exports.postExcluirMercado = (req, res, next) => {
  let mercadoId = req.body.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    return mercado.destroy();
  }).then(() => {
    res.redirect('/mercado');
  }).catch(console.error);
};

exports.postEditarMercado = (req, res, next) => {
  let mercadoId = req.params.mercadoId;
  Mercado.findByPk(mercadoId).then(mercado => {
    mercado.update(req.body).then(() => {
      res.redirect('/mercado');
    });
  }).catch(console.error);
};