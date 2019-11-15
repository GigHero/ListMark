const Compra = require('../db').Compra;
const Item = require('../db').Item;
const Lista = require('../db').Lista;
const Mercado = require('../db').Mercado;
const ValorItem = require('../db').ValorItem;


exports.postNovaCompra = (req, res, next) => {
  let compra = {
    idLista: req.body.idLista,
    idMercado: req.body.idMercado
  }
  Compra.create(compra)
    .then(function(compraSalva){
      let valorItem = {  
        idCompra: compraSalva.id,
        idItem: req.body.idItem,
        preco: req.body.preco,
        quantidade: req.body.quantidade
      }
      return ValorItem.create(valorItem)
    }).then(function(valorItemSalvo){
      res.redirect('/compras');
    });
};

exports.getNovaCompra = (req, res, next) => {
  Lista.findAll().then(listas=>{
    return Mercado.findAll().then(mercados=>{
      return Item.findAll().then(itens=>{
        res.render('compra/novaCompra', {
          linkAtivo: 'compras',
          formAction: '/compras/novo',
          compra: Compra.build({}),
          valorItem: Compra.build({}),
          listas: listas,
          mercados:mercados,
          itens:itens
        });
      }).catch(console.error);  
    })
  })
};

exports.getCompras = (req, res, next) => {
  Compra.findAll({
    include: [
      {
        model: Lista,
        include: [
          {
            model: Mercado
          }
        ]
      }
    ]
  }).then(compras => {
    res.render('compra/listaCompras', {
      linkAtivo: 'compras',
      compras: compras
    });
  }).catch(console.error);
};


exports.getValorItens = (req, res, next) => {
  ValorItem.findAll({
    where: {
      idCompra: req.params.idCompra
    }
  }).then(itens => {
    res.render('compra/listaValorItens', {
      linkAtivo: 'compras',
      itens: itens
    });
  }).catch(console.error);
};

exports.getEditarCompra = (req, res, next) => {
  let compraId = req.params.compraId;
  Compra.findByPk(compraId).then(compra => {
    return Lista.findAll().then(listas=>{
      return Mercado.findAll().then(mercados=>{
        return Item.findAll().then(itens=>{
          res.render('compra/editarCompras', {
            linkAtivo: 'compras',
            formAction: '/compras/editar/' + compraId,
            compra: compra,
            listas: listas,
            mercados: mercados,
            itens: itens
          });
        }).catch(console.error);  
      })
    })
  }).catch(console.error);
};

exports.postExcluirCompra = (req, res, next) => {//Ao excluir a compra tambem tera de excluir todos os itens com valores da tabela ValorItem tambem
  let compraId = req.body.compraId;
  Compra.findByPk(compraId).then(compra => {
    return ValorItem.destroy({
      where:{
        idCompra: compra.id
      }
    }).then(function() {
      return compra.destroy();
    })
  }).then(() => {
    res.redirect('/compras');
  }).catch(console.error);
};//a fazer


exports.postEditarCompra = (req, res, next) => {
  let itemId = req.params.itemId;
  Item.findByPk(itemId).then(item => {
    item.update(req.body).then(() => {
      res.redirect('/itens');
    });
  }).catch(console.error);
};
//---------------------------------------------Seção de controle de Lista dentro de compras-----------------------------

exports.getListasCompras = (req, res, next) => {
  Lista.findAll().then(listas => {
    res.render('compra/listaListas', {
      linkAtivo: 'compras',
      listas: listas
    });
  }).catch(console.error);
};


//---------------------------------------------Seção de controle de Mercados dentro de compras-----------------------------

exports.getMercadosCompras = (req, res, next) => {
  Compra.findAll({
    include: [
      {
        model: Lista,
        include: [
          {
            model: Mercado
          }
        ]
      }
    ],
    where: {
      idLista: req.params.listaId
    }
  }).then(mercados => {
    res.render('compra/listamercados', {
      linkAtivo: 'compras',
      mercados: mercados
    });
  }).catch(console.error);
};

//---------------------------------------------Seção de controle de Itens e valor dentro de compras-----------------------------

exports.getItensCompras = (req, res, next) => {
  Compra.findAll({
    include: [
      {
        model: Lista,
        include: [
          {
            model: Mercado
          }
        ]
      }
    ],
    where: {
      idLista: req.params.listaId,
      idMercado: req.params.mercadoId
    }
  }).then(itens => {
    res.render('compra/listaItens', {
      linkAtivo: 'compras',
      itens: itens
    });
  }).catch(console.error);
};
