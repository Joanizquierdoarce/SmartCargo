const {mensajesChat, Viajes, Usuario}= require('../models')

exports.crearMensaje= async(req, res) =>{
    try{
        const {viaje_id, mensaje}= req.body;
        const emisor_id=req.usuario.id;
        if (!viaje_id || !mensaje){
            return res.status(400).json({error: 'Faltan campos obligatorios'})
        }
        const nuevoMensajes= await mensajesChat.create({
            viaje_id,
            emisor_id,
            mensaje,
        })
        res.status(201).json(nuevoMensajes)
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Error al crear el mensaje'})
    }
}

exports.obtenerMensajesPorViaje= async(req,res)=>{
    try{
        const { viaje_id }= req.params;
        const mensajes= await mensajesChat.findAll({
            where:{viaje_id},
            include: {
                model:Usuario,
                attributes: ['id', 'nombre', 'apellido', 'correo']
            },
            order: [['fecha', 'ASC']]
        });
        res.status(200).json(mensajes)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al obtener los mensajes'})
    }
}
exports.actualizarMensaje= async(req,res)=>{
    try{
        const {id}= req.params;
        const { mensaje}= req.body;
        const msg = await mensajesChat.findByPk(id);
        if (!msg){
            return res.status(404).json({ error: 'Mensaje no encontrado'})
        }
        if (msg.emisor_id!== req.usuario.id){
            return res.status(403).json({ error: 'No tienes permiso para editar este mensaje'})
        }
        msg.mensaje=mensaje;
        await msg.save()

        res.status(200).json(msg);
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'No se pudo actualizar el mensaje'})
    }
}

exports.eliminarMensaje=async(req,res)=>{
    try{
        const {id}=req.params;
        const msg= await mensajesChat.findByPk(id);
        if(!msg){
            return res.status(404).json({error: 'Este mensaje no se pudo encontrar'})
        }
        if(msg.emisor_id!==req.usuario.id){
            return res.status(403).json({error: 'No tienes permiso para eliminar este mensaje'})
        }
        await msg.destroy()
        res.status(200).json({error: 'Mensaje eliminado correctamente'})
    } catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al eliminar el mensaje'})
    }
}