const express = require('express');
const router = express.Router();

const listasController = require('../controllers/listasController');

router.get('/editar/:listaId', listasController.getEditarLista);
router.post('/editar/:listaId', listasController.postEditarLista);
router.post('/excluir/:listaId', listasController.postExcluirLista);
router.post('/nova', listasController.postNovaLista);
router.get('/nova', listasController.getNovaLista);
router.get('/', listasController.getListas);

module.exports = router;
