const Vehiculo = require('../models/vehiculo')

exports.crearVehiculo= async(req, res)=>{
    try{
        const{
           placa,
           tipo,
           peso_maximo,
           soat,
           tecnomecanica
        }=req.body;

        if (!placa || !tipo || !peso_maximo || !soat || !tecnomecanica){
            return res.status(400).json({error: "Te faltan campos necesarios para crear el vehiculo"})
        }
        const nuevoVehiculo= await Vehiculo.create({
            placa,
            tipo,
            peso_maximo,
            soat,
            tecnomecanica,
            propietario_id: req.usuario.id
        })
        res.status(201).json(nuevoVehiculo)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'no se pudo crear el vehiculo'})
    }
}

exports.obtenerVehiculoPlaca= async(req,res) =>{
    try{
        const obtenerVehiculo=await Vehiculo.findOne({where: {placa: req.params.placa}})
        res.status(200).json(obtenerVehiculo)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al obtener el vehiculo'})
    }
}

exports.obtenerVehiculosTranportador=async(req, res) =>{
    try{
        const vehiculoTransportador= await Vehiculo.findAll({ where:{propietario_id: req.params.propietario_id }})
        res.status(200).json(vehiculoTransportador)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al obtener los vehiculos del transportador'})
    }
}

exports.actualizarVehiculo=async(req,res)=>{
    try{
        const {placa}=req.params;
        const datosActualizarVehiculo= req.body;
        const filasActualizadasVehiculo = await Vehiculo.update(datosActualizarVehiculo, {where:{placa}})
        if (filasActualizadasVehiculo===0){
            return res.status(404).json({error: 'No existe el vehiculo o no se encontraron'})
        }
        const vehiculoActulizado= await Vehiculo.findOne({where:{placa:placa}})
        res.status(201).json(vehiculoActulizado)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'No se puedo actualizar el vehiculo'})
    }
}

exports.eliminarVehiculo=async(req,res) =>{
    try{
        const {placa}=req.params;
        const usuarioId=req.usuario.id;
        const vehiculo = await Vehiculo.findOne({ where: { placa }})
        if(!vehiculo){
            return res.status(404).json({ error: 'Vehiculo no encontrado'})
        }
        if (vehiculo.propietario_id!==usuarioId){
            return res.status(403).json({ eeror: 'No tienes permiso para eliminar este vehiculo'})
        }

        await Vehiculo.destroy()
        res.status(202).json({mensaje: 'Vehículo eliminado correctamente'})
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'No se pudo eliminar el vehiculo'})
    }
}