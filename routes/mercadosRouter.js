const express = require('express');
const router = express.Router();

const mercadosController = require('../controllers/mercadosController');

router.get('/editar/:mercadoId', mercadosController.getEditarMercado);
router.post('/editar/:mercadoId', mercadosController.postEditarMercado);
router.post('/excluir/:mercadoId', mercadosController.postExcluirMercado);
router.post('/novo', mercadosController.postNovoMercado);
router.get('/novo', mercadosController.getNovoMercado);
router.get('/', mercadosController.getMercados);

module.exports = router;
