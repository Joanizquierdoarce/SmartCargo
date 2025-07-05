const {Carga, TarifaRuta}= require('../models');

exports.crearCarga = async(req, res) =>{
    try{
        const{
            origen,
            destino,
            tipo_carga,
            peso,
            descripcion,
        }=req.body;

        if (!origen || !destino || !tipo_carga || !peso || !descripcion) {
            return res.status(400).json({error: 'Faltan campos obligatorios'})
        }
        const tarifa = await TarifaRuta.findOne({
            where: {
                origen,
                destino,
                tipo_carga
            }
        })
        if (!tarifa){
            return res.status(400).json({error: 'No existe tarifa para esa ruta'})
        }
        const valor_estimado = parseFloat(tarifa.tarifa_base)+ (parseFloat(tarifa.tarifa_kg)*peso);

        const nuevaCarga= await Carga.create({
            cliente_id:req.usuario.id,
            origen,
            destino,
            tipo_carga,
            peso,
            descripcion,
            valor_estimado
        })
        res.status(201).json(nuevaCarga)
    }catch (err){
        console.error(err)
        res.status(500).json({ error: ' Error al crear la carga'})
    }
};

exports.obtenerCargasPorCliente=async(req,res)=>{
    try{
        const clienteId= req.params.cliente_id
        const allCargas= await Carga.findAll( { where: { cliente_id: clienteId}});
        res.status(200).json(allCargas);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las cargas'});
    }
};
exports.obtenerCarga= async(req, res)=>{
    try{
        const obtenerCarga= await Carga.findOne({where:{id: req.params.id}})
        if (!obtenerCarga){
            return res.status(404).json({error: 'Carga no encontrada'});
        }
        return res.status(200).json(obtenerCarga)
    }catch(err){
        console.error(err);
         return res.status(500).json({ error: 'Error al obtener la carga'})
    }
 }
 exports.obtenerTodasLasCargas = async (req, res) => {
    try {
        const cargas = await Carga.findAll({ where:{estado:"pendiente"}});
        res.status(200).json(cargas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las cargas' });
    }
};