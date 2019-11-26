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
      res.json({
        funcionou: true
      });
    }).catch(function(e) {
      console.error(e);
      res.json({
        funcionou: false
      });
    })
};

exports.getNovaCompra = (req, res, next) => {
  Lista.findAll().then(listas=>{
    return Mercado.findAll().then(mercados=>{
      return Item.findAll().then(itens=>{
        res.json({
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
        model: Lista,// as: 'Listas',
        include: [
          {
            model: Mercado, as: 'Mercados'
          }
        ]
      }
    ]
  }).then(compras => {
    res.json({
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
    res.json({
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
          res.json({
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
    res.json({
      funcionou: true
    });
  }).catch(function(e) {  
    console.error(e);
    res.json({
      funcionou: false
    });
  });//a fazer
}


exports.postEditarCompra = (req, res, next) => {
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
//---------------------------------------------Seção de controle de Lista dentro de compras-----------------------------

exports.getListasCompras = (req, res, next) => {
  Lista.findAll().then(listas => {
    res.json({
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
        model: Lista, as: 'lista',
      },
      {
        model: Mercado, as: 'mercado'
      }
    ],
    where: {
      idLista: req.params.listaId
    }
  }).then(compras => {
    res.json({
      linkAtivo: 'compras',
      compras: compras
    });
  }).catch(console.error);
};

//---------------------------------------------Seção de controle de Itens e valor dentro de compras-----------------------------

exports.getItensCompras = (req, res, next) => {
  ValorItem.findAll({
    include: [
      {
        model: Item, as: 'itemCompra',
      },
    ],
    where: {
      idCompra: req.params.compraId
    }
  }).then(itens => {
    res.json({
      linkAtivo: 'compras',
      itens: itens
    });
  }).catch(console.error);
};
