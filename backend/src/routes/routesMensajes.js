const express= require('express')
const router= express.Router();
const auth = require('../middlewares/authMiddleware')
const controllerMensajes= require('../controllers/mensajescontroller')

router.post('/crear', auth(['cliente', 'transportador']), controllerMensajes.crearMensaje);
router.get('/viaje/:viaje_id', auth(['cliente', 'transportador']), controllerMensajes.obtenerMensajesPorViaje);
router.put('/:id', auth(['cliente', 'transportador']), controllerMensajes.actualizarMensaje);
router.delete('/:id', auth(['cliente', 'transportador']), controllerMensajes.eliminarMensaje);

module.exports=router