const express = require('express');
const router = express.Router();
const cargaController= require('../controllers/cargaController')
const auth= require('../middlewares/authMiddleware')

router.post('/crear', auth(['cliente']), cargaController.crearCarga);
router.get('/todas', auth(['transportador', 'admin']), cargaController.obtenerTodasLasCargas);
router.get('/cliente/:cliente_id', cargaController.obtenerCargasPorCliente);
router.get('/:id', cargaController.obtenerCarga)


module.exports=router;
