import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

function  Login({setIsAuthenticated}){
    const [correo, setCorreo]=useState('');
    const [password, setPassword]= useState('')
    const [mensaje, setMensaje]= useState('');
    const navigate=useNavigate();

    const handleLogin = async()=>{
        try{
            const res=await axios.post('/api/usuario/login', {correo, contrasena:password})
            localStorage.setItem('token', res.data.token);
            localStorage.setItem("rol", res.data.rol);
            localStorage.setItem("id", res.data.id)
            setIsAuthenticated(true);
            setMensaje('Login exitoso');
            if (res.data.rol==="cliente"){
                navigate('/cargas');
            }else if (res.data.rol==='transportador'){
                navigate('/cargas');
            }else if (res.data.rol==='admin'){
                navigate('/cargas');
            } else {
                navigate('/')
            }
        }catch(err){
            console.error(err)
            setMensaje('Error al iniciar sesión')
        }
        
    }
    return(
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 px-4">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
                    <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Iniciar sesión</h2>
                    <input 
                    className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={correo} onChange={e=>setCorreo(e.target.value)} placeholder="Correo"/>
                    <input type="password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    <button onClick={handleLogin}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition"
                    >Login user</button>
                    {mensaje &&(
                         <p className="mt-4 text-sm text-red-500 text-center">{mensaje}</p>
                    )}
                     </div>
                     </div>
    );
}

export default Login;