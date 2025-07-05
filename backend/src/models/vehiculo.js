const {DataTypes}= require('sequelize');
const sequelize = require('../../config/db');

const Vehiculo = sequelize.define('vehiculo',{
    placa: {type: DataTypes.STRING, unique: true, allowNull:false},
    tipo: {type: DataTypes.STRING, allowNull:false},
    peso_maximo: {type: DataTypes.FLOAT, allowNull:false},
    soat: {type: DataTypes.STRING, allowNull: false},
    tecnomecanica: {type: DataTypes.STRING, allowNull:false}   
},{
    tableName: 'vehiculos',
    timestamps: false
})


module.exports=Vehiculo