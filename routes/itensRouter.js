const express = require('express');
const router = express.Router();

const itensController = require('../controllers/itensController');

router.get('/editar/:itemId', itensController.getEditarItem);
router.post('/editar/:itemId', itensController.postEditarItem);
router.post('/excluir/:itemId', itensController.postExcluirItem);
router.post('/nova', itensController.postNovoItem);
router.get('/nova', itensController.getNovoItem);
router.get('/', itensController.getItens);

module.exports = router;
