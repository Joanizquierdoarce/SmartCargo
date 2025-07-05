const {Incidencia, Usuario, Viajes}= require('../models')

exports.crearIncidencia= async(req, res)=>{
    try{
        const {viaje_id, descripcion}=req.body;
        const usuario_id= req.usuario.id;
        if(!viaje_id || !descripcion ){
            return res.status(400).json({ error: 'Faltan campos obligatorios'}) 
        }
        const nuevaIncidencia= await Incidencia.create({
            viaje_id,
            usuario_id,
            descripcion
        }) 
        res.status(201).json({mensaje: 'Incidencia registrada', nuevaIncidencia})
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'No fue posible crear la incidencia'})
    }
}

exports.obtenerTodas= async(req, res)=>{
    try{
        const incidencias= await Incidencia.findAll({
            include:[
                {model: Viajes},
                {model: Usuario, attributes:['id', 'nombre', 'apellido']}
            ]
        });
        res.status(200).json(incidencias)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'No se pudieron obtener las incidencias'})
    }
}
exports.obtenerPorViaje=async(req,res)=>{
    try{
        const{ viaje_id}=req.params;
        const incidencia= await Incidencia.findAll({
            where:{viaje_id},
            include:[{model:Usuario, attributes:['nombre', 'apellido']}]
        });
        res.status(200).json(incidencia)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al obtener incidencias por Carga'})
    }
}

exports.marcarComoSolucionada= async(req, res)=>{
    try{
        const {id}= req.params;
        const incidencia= await Incidencia.findByPk(id);

        if (!incidencia){
            return res.status(404).json({error: 'Incidencia no encontrada'})
        }
        incidencia.estado='solucionada';
        await incidencia.save();
        res.status(200).json(incidencia)
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Error al actualizar la incidencia'})
    }
}