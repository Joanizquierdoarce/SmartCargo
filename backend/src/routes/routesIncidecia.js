const express= require('express')
const router= express.Router()
const auth= require('../middlewares/authMiddleware')
const controllersIncidencia= require('../controllers/controllerIncidencia')

router.post('/crear', auth(['cliente', 'transportador']), controllersIncidencia.crearIncidencia);
router.get('/', controllersIncidencia.obtenerTodas);
router.get('/viaje/:viaje_id', controllersIncidencia.obtenerPorViaje);
router.put('/solucionar/:id', auth(['admin', 'transportador']), controllersIncidencia.marcarComoSolucionada);

module.exports=router