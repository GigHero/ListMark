const Compra = require('../db').Compra;
const Mercado = require('../db').Mercado;
const Lista = require('../db').Lista;

exports.postNovoCompra = (req, res, next) => {
  Compra.create(req.body)
    .then((compra) => {
      res.redirect('/compras');
    }).catch(console.error);
};

exports.getNovoCompra = (req, res, next) => {
  res.render('compras/novoCompra', {
    linkAtivo: 'compras',
    formAction: '/compras/nova',
    compra: Compra.build({}),
  });
};

exports.getCompras = (req, res, next) => {
  Item.findAll().then(compras => {
    res.render('compras/listaCompras', {
      linkAtivo: 'compras',
      compras: compras
    });
  }).catch(console.error);
};

exports.getEditarCompra = (req, res, next) => {
  let compraId = req.params.compraId;
  Compra.findByPk(compraId).then(compra => {
    res.render('compras/editarCompras', {
      linkAtivo: 'compras',
      formAction: '/compras/editar/' + compraId,
      compra: compra
    });
  }).catch(console.error);
};

exports.postExcluirCompra = (req, res, next) => {
  let compraId = req.body.compraId;
  compra.findByPk(compraId).then(compra => {
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