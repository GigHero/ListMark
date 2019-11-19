const express = require('express');
const router = express.Router();

const comprasTesteController = require('../controllers/comprasTesteController');

router.get('/editar/:compraId', comprasTesteController.getEditarCompra);
router.post('/editar/:compraId', comprasTesteController.postEditarCompra);
router.post('/excluir/:compraId', comprasTesteController.postExcluirCompra);
router.post('/novo', comprasTesteController.postNovaCompra);
router.get('/novo', comprasTesteController.getNovaCompra);
router.get('/', comprasTesteController.getListasCompras);
router.get('/Listas', comprasTesteController.getListasCompras);
router.get('/Listas/:listaId', comprasTesteController.getMercadosCompras);
router.get('/Listas/Mercados/:compraId', comprasTesteController.getItensCompras);

module.exports = router;
