const sequelize= require('./config/db');
const dotenv = require('dotenv')
const express= require('express');
const cors = require('cors');
const jsonwebtoken= require('jsonwebtoken')
const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


app.use(express.json())
dotenv.config();
const PORT = process.env.PORT || 5000;
sequelize.authenticate().then(()=>{
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    app.listen(PORT, () =>{
        console.log(`servidor ejecutandose en http://localhost:${PORT}` )
    })
}).catch((err)=>{
    console.error('❌ Error al conectar con la base de datos:', err)
})
app.use('/api/usuario', require('./src/routes/routesUsuario'));
app.use('/api/carga', require('./src/routes/routesCarga'));
app.use('/api/tarifa', require('./src/routes/routesTarifaRuta'));
app.use('/api/vehiculo', require('./src/routes/routesVehiculo'));
app.use('/api/viaje', require('./src/routes/routesViajes'));
app.use('/api/incidencia', require('./src/routes/routesIncidecia'));
app.use('/api/mensaje', require('./src/routes/routesMensajes'))




