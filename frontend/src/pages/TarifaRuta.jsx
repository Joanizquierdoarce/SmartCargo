import { useEffect, useState } from "react";
import axios from "../api/axios";

function TarifaRuta() {
    const [tarifas, setTarifas] = useState([]);
    const [destinosFiltrados, setDestinosFiltrados] = useState([]);
    const [tiposCargaFiltrados, setTiposCargaFiltrados] = useState([]);
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [tipoCarga, setTipoCarga] = useState("");
    const [tipoVehiculo, setTipoVehiculo] = useState("");
    const [tarifaBase, setTarifaBase] = useState("");
    const [tarifaKg, setTarifaKg] = useState("");
    const [mensaje, setMensaje] = useState("");

    const rol = localStorage.getItem("rol");
    const token = localStorage.getItem("token");
    const [filtroOrigen, setFiltroOrigen]=useState('');
    const [filtroDestino, setFiltroDestino]= useState('');
    const [filtroTipoCarga, setFiltroTipoCarga]=useState('');
    const [tarifaFiltrada, setTarifaFiltrada]=useState(null);
    const [mensajeFiltro, setMensajeFiltro]= useState('');
    const obtenerTarifas = async () => {
        try {
            const res = await axios.get("/api/tarifa");
            setTarifas(res.data);
        } catch (err) {
            console.error("Error al obtener tarifas", err);
        }
    };

    useEffect(() => {
        obtenerTarifas();
    }, []);
    const handleOrigenChange = (valor) => {
        setFiltroOrigen(valor);
        setFiltroDestino("");
        setFiltroTipoCarga("");
        setTarifaFiltrada(null);

        const destinos = tarifas
            .filter((t) => t.origen === valor)
            .map((t) => t.destino);
        setDestinosFiltrados([...new Set(destinos)]);
        setTiposCargaFiltrados([]);
    };

    const handleDestinoChange = (valor) => {
        setFiltroDestino(valor);
        setFiltroTipoCarga("");
        setTarifaFiltrada(null);

        const tipos = tarifas
            .filter((t) => t.origen === filtroOrigen && t.destino === valor)
            .map((t) => t.tipo_carga);
        setTiposCargaFiltrados([...new Set(tipos)]);
    };


    const crearTarifa = async () => {
        if (!origen || !destino || !tipoCarga || !tipoVehiculo || !tarifaBase || !tarifaKg) {
            setMensaje("⚠️ Todos los campos son obligatorios.");
            return;
        }

        try {
            const res = await axios.post(
                "/api/tarifa/crear",
                {
                    origen,
                    destino,
                    tipo_carga: tipoCarga,
                    tipo_vehiculo: tipoVehiculo,
                    tarifa_base: parseFloat(tarifaBase),
                    tarifa_kg: parseFloat(tarifaKg),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMensaje("✅ Tarifa creada.");
            setTarifas([...tarifas, res.data]);
            setOrigen("");
            setDestino("");
            setTipoCarga("");
            setTipoVehiculo("");
            setTarifaBase("");
            setTarifaKg("");
        } catch (err) {
            console.error(err);
            setMensaje("❌ Error al crear tarifa.");
        }
    };
    const FiltroTarifaRuta=async()=>{
        if(!filtroOrigen || !filtroDestino || !FiltroTarifaRuta){
            setMensajeFiltro("Todos los campos del filtro son obligatorios")
            setTarifaFiltrada(null);
            return;
        }
        try{
            const res =await axios.get(`/api/tarifa/buscar`, {
                params:{
                    origen:filtroOrigen,
                    destino: filtroDestino,
                    tipo_carga:filtroTipoCarga
                },
                headers:{Authorization: `Bearer ${token}`}
            });
            setTarifaFiltrada(res.data)
            setMensajeFiltro('')
        }catch(err){
            console.error(err)
            setTarifaFiltrada(null);
            setMensajeFiltro("❌ Tarifa no encontrada.")
        }
    }
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Tarifas de Rutas</h2>
            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Buscar tarifa por ruta</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        className="p-2 border rounded"
                        value={filtroOrigen}
                        onChange={(e) => handleOrigenChange(e.target.value)}
                    >
                        <option value="">Selecciona origen</option>
                        {[...new Set(tarifas.map((t) => t.origen))].map((origen) => (
                            <option key={origen} value={origen}>{origen}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded"
                        value={filtroDestino}
                        onChange={(e) => handleDestinoChange(e.target.value)}
                        disabled={!filtroOrigen}
                    >
                        <option value="">Selecciona destino</option>
                        {destinosFiltrados.map((destino) => (
                            <option key={destino} value={destino}>{destino}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded"
                        value={filtroTipoCarga}
                        onChange={(e) => setFiltroTipoCarga(e.target.value)}
                        disabled={!filtroDestino}
                    >
                        <option value="">Tipo de carga</option>
                        {tiposCargaFiltrados.map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={FiltroTarifaRuta}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Buscar tarifa
                </button>
                {mensajeFiltro && <p className="mt-2 text-red-500">{mensajeFiltro}</p>}
            </div>

            {/* Resultado del filtro */}
            {tarifaFiltrada && (
                <div className="mb-6 bg-green-50 p-4 rounded shadow">
                    <h4 className="text-lg font-bold mb-2 text-green-700">Resultado de la búsqueda:</h4>
                    <p>Origen: {tarifaFiltrada.origen}</p>
                    <p>Destino: {tarifaFiltrada.destino}</p>
                    <p>Tipo de carga: {tarifaFiltrada.tipo_carga}</p>
                    <p>Tipo de vehículo: {tarifaFiltrada.tipo_vehiculo}</p>
                    <p>Tarifa base: ${tarifaFiltrada.tarifa_base}</p>
                    <p>Tarifa por kg: ${tarifaFiltrada.tarifa_kg}</p>
                </div>
            )}
            {rol === "admin" && (
                <>
                <div className="bg-white shadow-md rounded p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Crear nueva tarifa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input className="input-style" placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
                    <input className="input-style" placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
                    <input className="input-style" placeholder="Tipo de carga" value={tipoCarga} onChange={(e) => setTipoCarga(e.target.value)} />
                    <input className="input-style" placeholder="Tipo de vehículo" value={tipoVehiculo} onChange={(e) => setTipoVehiculo(e.target.value)} />
                    <input className="input-style" type="number" placeholder="Tarifa base" value={tarifaBase} onChange={(e) => setTarifaBase(e.target.value)} />
                    <input className="input-style" type="number" placeholder="Tarifa por kg" value={tarifaKg} onChange={(e) => setTarifaKg(e.target.value)} />
                    </div>
                    <button onClick={crearTarifa} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200">Registrar tarifa</button>
                    {mensaje && <p className="mt-3 text-sm text-red-500">{mensaje}</p>}
                    </div>
                </>
            )}
            <div className="bg-white shadow-md rounded p-6"></div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Listado de tarifas</h3>
            <ul className="space-y-3">
                {tarifas.map((t) => (
                    <li key={t.id} className="border border-gray-200 rounded p-3 bg-gray-50 hover:bg-gray-100">
                        <p className="font-semibold text-gray-800">{t.origen} ➜ {t.destino}</p> 
                        <p className="text-sm text-gray-600">Tipo carga: <span className="font-medium">{t.tipo_carga}</span> </p>
                        <p className="text-sm text-gray-600">Tipo vehículo:<span className="font-medium">{t.tipo_vehiculo}</span></p>
                        <p className="text-sm text-gray-600">Base: <span className="text-green-600 font-medium">${t.tarifa_base}</span></p> 
                        <p className="text-sm text-gray-600">xKg: <span className="text-green-600 font-medium">${t.tarifa_kg}</span></p> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TarifaRuta;