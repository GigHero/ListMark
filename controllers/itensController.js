const Item = require('../db').Item;

exports.postNovoItem = (req, res, next) => {
  Item.create(req.body)
    .then((item) => {
      res.redirect('/itens');
    }).catch(console.error);
};

exports.getNovoItem = (req, res, next) => {
  res.render('itens/novoItem', {
    linkAtivo: 'itens',
    formAction: '/itens/nova',
    item: Item.build({}),
  });
};

exports.getItens = (req, res, next) => {
  Item.findAll().then(itens => {
    res.render('itens/listaItens', {
      linkAtivo: 'itens',
      itens: itens
    });
  }).catch(console.error);
};

exports.getEditarItem = (req, res, next) => {
  let itemId = req.params.itemId;
  Item.findByPk(itemId).then(item => {
    res.render('itens/editarItens', {
      linkAtivo: 'itens',
      formAction: '/itens/editar/' + itemId,
      item: item
    });
  }).catch(console.error);
};

exports.postExcluirItem = (req, res, next) => {
  let itemId = req.body.itemId;
  Item.findByPk(itemId).then(item => {
    return item.destroy();
  }).then(() => {
    res.redirect('/itens');
  }).catch(console.error);
};

exports.postEditarItem = (req, res, next) => {
  let itemId = req.params.itemId;
  Item.findByPk(itemId).then(item => {
    item.update(req.body).then(() => {
      res.redirect('/itens');
    });
  }).catch(console.error);
};