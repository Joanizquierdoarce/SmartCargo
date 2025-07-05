import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Register(){
    const [nombre, setNombre]= useState('');
    const [apellido, setApellido]= useState('');
    const [correo, setCorreo]= useState('');
    const [contrasena, setContrasena]= useState('');
    const [direccion, setDireccion]= useState('');
    const [telefono, setTelefono]= useState('');
    const [ciudad, setCiudad]= useState('');
    const [rol, setRol]= useState('cliente');
    const [mensaje, setMensaje]= useState('');
    const navigate = useNavigate();

    const handleRegister = async()=>{
        if (!nombre|| !apellido || !correo || !contrasena || !direccion || !telefono||!ciudad || !rol){
            setMensaje("⚠️Todos los campos son obligatorios")
            return;
        }

        try{
            await axios.post('/api/usuario/register', {
                nombre,
                apellido,
                correo,
                contrasena,
                rol,
                ciudad,
                telefono,
                direccion
            });
            setMensaje("Registro exitoso. Redirigiendo al login...");
            setTimeout(()=> navigate('/login'), 1500);
        }catch(error){
            console.error(error);
            const msg= error.response?.data?.error || "Error al registrar usuario.";
            setMensaje(msg)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Registro de Usuario</h2>
            <input className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Nombre" value={nombre} onChange={e =>setNombre(e.target.value)}/>
            <input className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Apellido" value={apellido} onChange={e =>setApellido(e.target.value)}/>
            <input className="input col-span-2" type="email" placeholder="Correo" value={correo} onChange={e =>setCorreo(e.target.value)}/>
            <input className="input col-span-2" type="password" placeholder="Contraseña" value={contrasena} onChange={e =>setContrasena(e.target.value)}/>
            <select className="input col-span-2" value="{rol}" onChange={e =>setRol(e.target.value)}>
                <option value="cliente"> Cliente</option>
                <option value="transportador">Transportador</option>
                <option value="admin">Administrador</option>
            </select>
            <br />
            <input className="input col-span-2" type="text" placeholder="Ciudad" value={ciudad} onChange={e =>setCiudad(e.target.value)}/>
            <input className="input col-span-2" type="tel" placeholder="Telefóno" value={telefono} onChange={e =>setTelefono(e.target.value)}/>
            <input className="input col-span-2" type="text" placeholder="Direccion" value={direccion} onChange={e =>setDireccion(e.target.value)}/>
            <br/>
            <button onClick={handleRegister} className="w-full mt-6 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Registrarse</button>
            <p className="text-center mt-4 text-sm text-red-500">{mensaje}</p>
        </div>
        </div>
    )

}

export default Register;