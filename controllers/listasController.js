const Lista = require('../db').Lista;

exports.postNovaLista = (req, res, next) => {
  Lista.create(req.body)
    .then((lista) => {
      res.redirect('/lista');
    }).catch(console.error);
};

exports.getNovaLista = (req, res, next) => {
  res.render('lista/novaLista', {
    linkAtivo: 'lista',
    formAction: '/lista/nova',
    lista: Lista.build({}),
  });
};

exports.getListas = (req, res, next) => {
  Lista.findAll().then(listas => {
    res.render('lista/listaListas', {
      linkAtivo: 'listas',
      listas: listas
    });
  }).catch(console.error);
};

exports.getEditarLista = (req, res, next) => {
  let listaId = req.params.listaId;
  Lista.findByPk(listaId).then(lista => {
    res.render('lista/editarListas', {
      linkAtivo: 'listas',
      formAction: '/lista/editar/' + listaId,
      lista: lista
    });
  }).catch(console.error);
};

exports.postExcluirLista = (req, res, next) => {
  let listaId = req.body.listaId;
  Lista.findByPk(listaId).then(lista => {
    return lista.destroy();
  }).then(() => {
    res.redirect('/lista');
  }).catch(console.error);
};

exports.postEditarLista = (req, res, next) => {
  let listaId = req.params.listaId;
  Lista.findByPk(listaId).then(lista => {
    lista.update(req.body).then(() => {
      res.redirect('/lista');
    });
  }).catch(console.error);
};