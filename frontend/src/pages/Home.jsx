
function Home() {
    return (
      <div className="text-center py-20 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <h1 className="text-5xl font-extrabold mb-4">Bienvenido a TransCarga</h1>
      <p className="text-lg mb-8">
        Tu solución confiable para el transporte de carga en todo el país.
      </p>
      <a
        href="/login"
        className="bg-white text-indigo-700 px-6 py-3 rounded shadow hover:bg-gray-100 transition"
      >
        Comenzar ahora
      </a>
    </div>
    );
  }
  
  export default Home;