import { useEffect, useState } from "react";
import axios from "../api/axios"

function Cargas(){
    const [origen, setOrigen]= useState('');
    const [destino, setDestino]=useState('');
    const [tipoCarga, setTipoCarga]=useState('');
    const [peso, setPeso]= useState('');
    const [descripcion, setDescripcion]= useState('');
    const [mensaje, setMensaje]= useState();
    const [cargas, setcargas]=useState([]);
    const [filtroId, setFiltroId]=useState('');
    const [cargaFiltrada, setCargaFiltrada]= useState(null);

    const token= localStorage.getItem("token");
    const rol= localStorage.getItem("rol");
    const clienteId= localStorage.getItem("id");

    useEffect(()=>{
        const fetchCargas = async () => {
            try {
                const endpoint =
                    rol === "cliente"
                        ? `/api/carga/cliente/${clienteId}`
                        : "/api/carga/todas";

                const res = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setcargas(res.data);
            } catch (err) {
                console.error("Error al obtener cargas", err);
                setMensaje("❌ No se pudieron cargar las cargas.");
            }
        };

        if (token && rol) fetchCargas();
    }, [token, rol, clienteId]);

    const crearCarga = async()=>{
        if (!origen || !destino || !tipoCarga || !peso || !descripcion){
            setMensaje("Todos los campos son obligatorios.");
            return;
        }
        try{
            const res= await axios.post("/api/carga/crear",
                {
                    origen, 
                    destino,
                    tipo_carga:tipoCarga,
                    peso: parseFloat(peso),
                    descripcion, 
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }

            );
            setMensaje("Carga creada con éxito.");
            setcargas([...cargas, res.data])
            setOrigen("");
            setDestino("");
            setTipoCarga("");
            setPeso("");
            setDescripcion("");
        }catch(err){
            console.error(err);
            const msg = err.response?.data?.error || "❌ Error al crear la carga.";
            setMensaje(msg);
        }
    }
    const filtroPorId=async()=>{
        if (!filtroId){
            setCargaFiltrada(null);
            return;
        }
        try{
            const res= await axios.get(`/api/carga/${filtroId}`, {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            setCargaFiltrada(res.data);
            setMensaje('');
        }catch(err){
            console.error(err)
            setCargaFiltrada(null)
            setMensaje("❌ Carga no encontrada")
        }
    }

    return(
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">Cargas {rol==="cliente"?"del Cliente":"Registradas"}</h2>
            <div className="mb-6 bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Buscar carga por ID</h3>
                <div className="flex space-x-2">
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="text"
                        placeholder="ID de la carga"
                        value={filtroId}
                        onChange={(e) => setFiltroId(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={filtroPorId}
                    >
                        Buscar
                    </button>
                </div>
                {mensaje && <p className="mt-2 text-red-500">{mensaje}</p>}
            </div>

            {/* Mostrar carga filtrada si existe */}
            {cargaFiltrada && (
                <div className="mb-6 bg-green-50 p-4 rounded shadow">
                    <h4 className="text-lg font-bold mb-2 text-green-700">Resultado de la búsqueda:</h4>
                    <p>ID: {cargaFiltrada.id}</p>
                    <p>Origen: {cargaFiltrada.origen}</p>
                    <p>Destino: {cargaFiltrada.destino}</p>
                    <p>Tipo de Carga: {cargaFiltrada.tipo_carga}</p>
                    <p>Peso: {cargaFiltrada.peso} kg</p>
                    <p>Descripción: {cargaFiltrada.descripcion}</p>
                    <p>Estado: {cargaFiltrada.estado || "pendiente"}</p>
                </div>
            )}
            {rol==="cliente" && (
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h4 className="text-xl font-semibold mb-4">Crear nueva carga</h4>
                    <div className="grid grid-cols-2 gap-4">
                    <input className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Origen" value={origen} onChange={e=>setOrigen(e.target.value)}/>
                    <input className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Destino" value={destino} onChange={e=>setDestino(e.target.value)}/>
                    <input className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Tipo de carga" value={tipoCarga} onChange={e=>setTipoCarga(e.target.value)}/>
                    <input className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="number" placeholder="Peso (kg)" value={peso} onChange={e=>setPeso(e.target.value)}/>
                    <input className="input col-span-2" type="text" placeholder="Descripcion" value={descripcion} onChange={e=>setDescripcion(e.target.value)}/>
                    </div>
                    <br/>
                    <button onClick={crearCarga} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Crear Carga</button>
                    <p className="mt-2 text-sm text-red-500">{mensaje}</p>
                </div>
            )}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Llistado de cargas</h3>
                <ul className="space-y-4">
                    {cargas.map((carga)=>(
                        <li key={carga.id} className="border-b pb-4">
                            <p className="text-indigo-700 font-semibold">id:{carga.id}</p>
                            <p className="text-indigo-700 font-semibold"><strong>{carga.origen}➜ {carga.destino}</strong></p>
                            <p>Tipo: <strong>{carga.tipo_carga}</strong>  | Peso: {carga.peso} kg </p>
                            <p>Estado: <span className="font-medium">{carga.estado || "pendiente"}</span></p>
                            <p>Descripción: {carga.descripcion}</p>
                            <p>Valor estimado: <span className="text-green-700">${carga.valor_estimado}</span> </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Cargas;