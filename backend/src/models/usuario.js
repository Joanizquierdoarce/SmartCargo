const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')

const Usuario= sequelize.define('usuarios', {
    nombre: {type:DataTypes.STRING, allowNull: false},
    apellido: {type:DataTypes.STRING, allowNull:false},
    correo: { type:DataTypes.STRING, unique: true},
    contrasena: {type:DataTypes.STRING, allowNull: false},
    rol: {type: DataTypes.STRING, allowNull: false},
    ciudad: {type:DataTypes.STRING, allowNull: false},
    telefono: {type: DataTypes.STRING, allowNull: false},
    direccion: {type: DataTypes.STRING,allowNull: false}
},{
    timestamps:false
});

module.exports=Usuario