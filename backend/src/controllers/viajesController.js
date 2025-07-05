const {Viajes, Carga, Vehiculo, Usuario }= require('../models')

exports.crearViaje= async(req,res)=>{
    try{
        const {
            carga_id,
            vehiculo_id
        }=req.body;
        const transportador_id= req.usuario.id
        if(!carga_id || !vehiculo_id){
            return res.status(400).json({ error: 'Faltan campos obligatorios'});
        }

        const carga= await Carga.findByPk(carga_id)
        if (!carga){
            return res.status(404).json({error: 'Carga no encontrada'})
        }
        if (['en tránsito', 'entregada'].includes(carga.estado)){
            return res.status(400).json({ error: `La carga ya está "${carga.estado}" y no puede ser asignada`});
        }
        const vehiculo= await Vehiculo.findOne({
            where:{
                id: vehiculo_id,
                propietario_id: transportador_id
            }
        });
        if (!vehiculo){
            return res.status(403).json({ error: 'Este vehiculo no te pertenece'})
        }

        const nuevoViaje= await Viajes.create({
            carga_id,
            transportador_id,
            vehiculo_id,
            fecha_inicio: new Date(),
            estado: 'en tránsito'
        })

        await carga.update({ estado: 'en tránsito'})

        const viajeCompleto= await Viajes.findByPk(nuevoViaje.id, {
            include: [
                {model: Carga},
                {model: Usuario, as: 'transportador', attributes:['id', 'nombre', 'apellido', 'correo', 'telefono']},
                {model: Vehiculo}
            ]
        })
        res.status(201).json(viajeCompleto)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al crear el viaje'})
    }
}

exports.actualizarViajeEntrega= async(req, res)=>{
    try{
        const { id }= req.params;
        const viaje= await Viajes.findByPk(id);
        if(!viaje){
            return res.status(404).json({ error: 'Viaje no encontrado'})
        }

        viaje.fecha_entrega= new Date();
        viaje.estado= 'entregado';
        await viaje.save()

        const carga= await Carga.findByPk(viaje.carga_id);
        if (carga){
            carga.estado= 'entregada';
            await carga.save();
        }
        res.status(200).json({ mensaje: 'Viaje y carga actualizadas a entregadas', viaje});
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al actualizar el viaje'})
    }
};

exports.cancelarViaje= async(req,res)=>{
    try{
        const {id} = req.params;
        const viaje = await Viajes.findByPk(id);
        if (!viaje){
            return res.status(404).json({error: 'Viaje no encontrado'})
        }

        if (viaje.transportador_id!== req.usuario.id){
            return res.status(403).json({ error: 'No tienes permiso para cancelar este viaje'})
        }
        if (viaje.estado==='entregado'){
            return res.status(400).json({ error: 'No se puede cancelar el viaje ya entregado'})
        }
        viaje.estado='cancelado'
        await viaje.save();

        const carga= await Carga.findByPk(viaje.carga_id)
        if (carga && carga.estado==='en tránsito'){
            carga.estado = 'cancelada';
            await carga.save();
        }else if (carga && carga.estado!== 'entregada'){
            carga.estado= ' pendiente';
            await carga.save();
        }
        res.status(200).json({ mensaje: 'Viaje cancelado correctamente', viaje})
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Error al cancelar el viaje'})
    }
}

exports.obtenerTodosViajes=async(req,res)=>{
    try{
        const viajes= await Viajes.findAll({
            include:[
                {model: Carga},
                {model: Usuario, as:'transportador', attributes:['id', 'nombre', 'apellido', 'correo', 'telefono'] },
                {model: Vehiculo}
            ]
        });
        res.status(200).json(viajes)
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Error al obtener los viajes'})
    }
}

exports.obtenerMisViajesID= async(req,res)=>{
    try{
        const obtenerMiViaje= await Viajes.findByPk(req.params.id, {
            include: [Carga, Vehiculo, {model: Usuario, as:'transportador'}]
        });
        if (!obtenerMiViaje){
            return res.status(404).json({ error: 'Viaje no encontrado'})
        }
        res.status(200).json(obtenerMiViaje)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'No se pudo obtener los viajes del transportador'})
    }
}

exports.eliminarMisViajes=async(req,res)=>{
    try{
        const viaje= await Viajes.findByPk(req.params.id)
        if (!viaje){
            return res.status(404).json({error: 'Viaje no encontrado'})
        }
        if(viaje.transportador_id!== req.usuario.id){
            return res.status(403).json({error: 'No tienes permiso para eliminar este viaje'})
        }
        if(viaje.estado !=='cancelado'){
            return res.status(403).json({ error: 'Solo se pueden eliminar viajes cancelados'})
        }
        await viaje.destroy();
        res.status(200).json({ mensaje: ' Viaje eliminado correctamente'});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el viaje'});
    }
}

