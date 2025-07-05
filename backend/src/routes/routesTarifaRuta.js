const express=require('express')
const router= express.Router()
const auth=require('../middlewares/authMiddleware')
const controllersTarifa= require('../controllers/tarifaRutaController')

router.post('/crear', auth(['admin']), controllersTarifa.crearTarifa);
router.get('/', controllersTarifa.obtenerTarifas);
router.get('/buscar', controllersTarifa.obtenerTarifaPorRuta);
router.put('/:id', auth(['admin']), controllersTarifa.actualizarTarifa)

module.exports=router;