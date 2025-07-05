const express= require('express')
const router= express.Router()
const vehiculoController= require('../controllers/vehiculoController')
const auth= require('../middlewares/authMiddleware')

router.post('/crear', auth(['transportador']), vehiculoController.crearVehiculo),
router.get('/placa/:placa', vehiculoController.obtenerVehiculoPlaca),
router.get('/transportador/:propietario_id', vehiculoController.obtenerVehiculosTranportador)
router.put('/:placa', auth(['transportador']), vehiculoController.actualizarVehiculo)
router.delete('/:placa', auth(['transportador']), vehiculoController.eliminarVehiculo)
module.exports=router;