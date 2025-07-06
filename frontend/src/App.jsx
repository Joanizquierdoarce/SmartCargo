import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Cargas from './pages/Cargas'
import Register from './pages/Register'
import TarifaRuta from './pages/TarifaRuta'
import Vehiculos from './pages/Vehiculos'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
function App(){
  const [isAuthenticated, setIsAuthenticated ]= useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [])
  const handleLogout=()=>{
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/login')
  };
  return(
    <>
  <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
  <h2 className="text-xl font-bold text-indigo-700">SmartCargo</h2>
  <div className="space-x-4">
    {!isAuthenticated ? (
      <>
        <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-indigo-600">Register</Link>
      </>
    ) : (
      <>
        <Link to="/cargas" className="text-gray-700 hover:text-indigo-600">Cargas</Link>
        <Link to="/tarifaruta" className="text-gray-700 hover:text-indigo-600">Tarifa por ruta</Link>
        <Link to="/vehiculo" className="text-gray-700 hover:text-indigo-600">Vehiculo</Link>
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Cerrar Sesión
        </button>
      </>
    )}
  </div>
</nav>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path='/cargas' element={<Cargas/>}/>
    <Route path='/tarifaruta' element={<TarifaRuta/>}/>
    <Route path='/vehiculo' element={<Vehiculos/>}/>
</Routes>
</>
)
}

export default App

