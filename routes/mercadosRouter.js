const express = require('express');
const router = express.Router();

const mercadosController = require('../controllers/mercadosController');

router.get('/editar/:mercadoId', mercadosController.getEditarMercado);
router.post('/editar/:mercadoId', mercadosController.postEditarMercado);
router.post('/excluir/:mercadoId', mercadosController.postExcluirMercado);
router.post('/nova', mercadosController.postNovoMercado);
router.get('/nova', mercadosController.getNovoMercado);
router.get('/', mercadosController.getMercados);

module.exports = router;
