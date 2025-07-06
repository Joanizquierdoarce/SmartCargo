import { useState, useEffect } from "react";
import axios from '../api/axios';

function Vehiculo(){
    const [vehiculos, setVehiculos]=useState([]);
    const [placa, setPlaca]= useState("");
    const [tipo, setTipo]= useState("");
    const [pesoMaximo, setPesoMaximo]= useState("");
    const [soat, setSoat]= useState("");
    const [tecnomecanica, setTecnomecanica]= useState("");
    const [mensaje, setMensaje]= useState("");
    const [buscarPlaca, setBuscarPlaca]=useState("");
    const [vehiculoBuscado, setVehiculoBuscado]= useState(null);

    const token= localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    const transportadorId= localStorage.getItem("id");

    useEffect(()=>{
        const obtenerVehiculos =async()=>{
            try{
                const res=await axios.get(`/api/vehiculo/transportador/${transportadorId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setVehiculos(res.data);
            }catch(err){
                console.error("Error al obtener los vehiculos propios", err)
            }
        };
        if (rol=== "transportador"){
            obtenerVehiculos();
        }
    }, [rol, token, transportadorId]);
    const crearVehiculo=async()=>{
        if (!placa || !tipo || !pesoMaximo ||!soat ||!tecnomecanica){
            setMensaje("Todos los campos son obligatorios")
            return;
        }
        try{
            const res= await axios.post(`/api/vehiculo/crear`, {
                placa,
                tipo, 
                peso_maximo: parseFloat(pesoMaximo),
                soat,
                tecnomecanica,
            },
        {
            headers: {Authorization: `Bearer ${token}`},
        });
        setVehiculos([...vehiculos, res.data])
        setMensaje("Vehiculo registrado exitosamente")
        setPlaca("");
        setTipo("");
        setPesoMaximo("");
        setSoat("");
        setTecnomecanica("");
        }catch(err){
            console.error(err)
            setMensaje(" Error al crear el vehiculo");
        }
    };
    const buscarVehiculo = async()=>{
        try{
            const res= await axios.get(`/api/vehiculo/${buscarPlaca}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setVehiculoBuscado(res.data)
        }catch(err){
            console.error(err)
            setVehiculoBuscado(null)
            setMensaje("Vehiculo no encontrado")
        }
    };
    const eliminarVehiculo = async (placa) => {
        try {
          await axios.delete(`/api/vehiculo/${placa}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setVehiculos(vehiculos.filter((v) => v.placa !== placa));
          setMensaje("🗑️ Vehículo eliminado");
        } catch (err) {
          console.error(err);
          setMensaje("❌ No se pudo eliminar el vehículo");
        }
      };
    return (
        <div className="max-w-5xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Gestión de Vehículos</h2>
    
          {/* Buscar vehículo */}
          <div className="mb-6 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-700">Buscar por placa</h3>
            <div className="flex gap-2">
              <input
                className="border p-2 rounded w-full"
                placeholder="Placa"
                value={buscarPlaca}
                onChange={(e) => setBuscarPlaca(e.target.value.toUpperCase())}
              />
              <button
                onClick={buscarVehiculo}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Buscar
              </button>
            </div>
            {vehiculoBuscado && (
              <div className="mt-4 p-3 bg-green-50 rounded">
                <p><strong>Placa:</strong> {vehiculoBuscado.placa}</p>
                <p><strong>Tipo:</strong> {vehiculoBuscado.tipo}</p>
                <p><strong>Peso Máximo:</strong> {vehiculoBuscado.peso_maximo} kg</p>
                <p><strong>SOAT:</strong> {vehiculoBuscado.soat}</p>
                <p><strong>Tecnomecánica:</strong> {vehiculoBuscado.tecnomecanica}</p>
              </div>
            )}
          </div>
    
          {/* Crear vehículo */}
          {rol === "transportador" && (
            <div className="mb-6 bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700 mb-2">Registrar vehículo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="input-style"
                  placeholder="Placa"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                />
                <input
                  className="input-style"
                  placeholder="Tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <input
                  className="input-style"
                  placeholder="Peso máximo (kg)"
                  type="number"
                  value={pesoMaximo}
                  onChange={(e) => setPesoMaximo(e.target.value)}
                />
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SOAT (fecha vencimiento)</label>
                <input
                  type="date"
                  className="input-style w-full"
                  value={soat}
                  onChange={(e) => setSoat(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tecnomecánica (fecha vencimiento)</label>
                <input
                  type="date"
                  className="input-style w-full"
                  value={tecnomecanica}
                  onChange={(e) => setTecnomecanica(e.target.value)}
                />
              </div>
              </div>
              <button
                onClick={crearVehiculo}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Registrar
              </button>
            </div>
          )}
    
          {/* Lista de vehículos */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700 mb-4">Mis vehículos</h3>
            <ul className="space-y-3">
              {vehiculos.map((v) => (
                <li
                  key={v.placa}
                  className="border p-3 rounded bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p><strong>{v.placa}</strong> - {v.tipo}</p>
                    <p className="text-sm text-gray-600">
                      Peso: {v.peso_maximo} kg | SOAT: {v.soat} | Tecno: {v.tecnomecanica}
                    </p>
                  </div>
                  <button
                    onClick={() => eliminarVehiculo(v.placa)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
    
          {mensaje && <p className="mt-4 text-center text-red-500">{mensaje}</p>}
        </div>
      );
    }
    
    export default Vehiculo;