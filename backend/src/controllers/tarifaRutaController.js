const TarifaRuta=require('../models/TarifaRuta')

exports.crearTarifa = async(req,res)=>{
    try{
        const {
            origen,
            destino,
            tipo_carga,
            tipo_vehiculo,
            tarifa_base,
            tarifa_kg
        }=req.body;

        if(!origen || !destino || !tipo_carga || !tipo_vehiculo || !tarifa_base || !tarifa_kg){
            return res.status(400).json({error: 'No llenaste todos los campos necesarios de la tarifa ruta'})
        }
        const nuevaTarifa= await TarifaRuta.create({
            origen, 
            destino,
            tipo_carga,
            tipo_vehiculo,
            tarifa_base,
            tarifa_kg
        })
        res.status(201).json(nuevaTarifa)
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Error al crear la tarifa '})
    }
}

exports.obtenerTarifas= async(req,res)=>{
    try{
        const Tarifas= await TarifaRuta.findAll();
        res.status(200).json(Tarifas);
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Error al obtener todas las tarifas'})
    }
}

exports.obtenerTarifaPorRuta= async(req, res)=>{
    try{
        const {origen, destino, tipo_carga}=req.query;
        const tarifa= await TarifaRuta.findOne({
            where:{ origen, destino, tipo_carga}
        });
        if (!tarifa){
            return res.status(404).json({ error: 'Tarifa no encontrada'})
        }
        res.status(200).json(tarifa)
    }catch(err){
        console.error(err)
        res.status(500).json({ error: 'Error al buscar la tarifa'})
    }
}
exports.actualizarTarifa=async(req,res)=>{
    try{
        const {id}=req.params;
        const datosActualizar= req.body;
        const [filasActualizadas]= await TarifaRuta.update(datosActualizar, {where:{id}})
        if(filasActualizadas===0){
            return res.status(404).json({error: 'Tarifa no encontrada o sin cambios'})
        }
        const tarifaActualizada= await TarifaRuta.findByPk(id)
        res.status(201).json(tarifaActualizada)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Error al actualizar la carga'})
    }
}