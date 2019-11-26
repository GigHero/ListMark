const Item = require('../db').Item;

exports.postNovoItem = (req, res, next) => {
  Item.create(req.body)
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

exports.getNovoItem = (req, res, next) => {
  res.json({
    linkAtivo: 'itens',
    formAction: '/itens/nova',
    item: Item.build({}),
  });
};

exports.getItens = (req, res, next) => {
  Item.findAll().then(itens => {
    res.json({
      linkAtivo: 'itens',
      itens: itens
    });
  }).catch(console.error);
};

exports.getEditarItem = (req, res, next) => {
  let itemId = req.params.itemId;
  Item.findByPk(itemId).then(item => {
    res.json({
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

exports.postEditarItem = (req, res, next) => {
  let itemId = req.params.itemId;
  Item.findByPk(itemId).then(item => {
    item.update(req.body).then(() => {
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
}