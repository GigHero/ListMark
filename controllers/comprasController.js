const Compra = require('../db').Compra;

exports.postNovaCompra = (req, res, next) => {
  Compra.create(req.body)
    .then((compra) => {
      res.redirect('/compras');
    }).catch(console.error);
};

exports.getNovoCompra = (req, res, next) => {
  res.render('compra/novaCompra', {
    linkAtivo: 'compras',
    formAction: '/compras/novo',
    compra: Compra.build({}),
  });
};

exports.getCompras = (req, res, next) => {
  Compra.findAll().then(compras => {
    res.render('compra/listaCompras', {
      linkAtivo: 'compras',
      compras: compras
    });
  }).catch(console.error);
};

exports.getEditarCompra = (req, res, next) => {
  let compraId = req.params.compraId;
  Compra.findByPk(compraId).then(compra => {
    res.render('compra/editarCompras', {
      linkAtivo: 'compras',
      formAction: '/compras/editar/' + compraId,
      compra: compra
    });
  }).catch(console.error);
};

exports.postExcluirCompra = (req, res, next) => {
  let compraId = req.body.compraId;
  Compra.findByPk(compraId).then(compra => {
    return compra.destroy();
  }).then(() => {
    res.redirect('/compras');
  }).catch(console.error);
};

exports.postEditarCompra = (req, res, next) => {
  let compraId = req.params.compraId;
  Compra.findByPk(compraId).then(compra => {
    compra.update(req.body).then(() => {
      res.redirect('/compras');
    });
  }).catch(console.error);
};