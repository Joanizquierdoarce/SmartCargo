const express= require('express');
const router= express.Router()
const controllerViajes= require('../controllers/viajesController');
const auth = require('../middlewares/authMiddleware')

router.post('/crear', auth(['transportador']), controllerViajes.crearViaje);
router.put('/entregar/:id', auth(['transportador']), controllerViajes.actualizarViajeEntrega);
router.put('/cancelar/:id', auth(['transportador']), controllerViajes.cancelarViaje);
router.get('/obtener/todos', auth(['admin']), controllerViajes.obtenerTodosViajes);
router.get('/:id', controllerViajes.obtenerMisViajesID);
router.delete('/:id', auth(['transportador']), controllerViajes.eliminarMisViajes);


module.exports=router;
