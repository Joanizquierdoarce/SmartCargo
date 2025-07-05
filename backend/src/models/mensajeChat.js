const {DataTypes}=require('sequelize');
const sequelize= require('../../config/db')

const mensajeChat= sequelize.define('mensajeChat',{
    viaje_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'viajes', key:'id'}},
    emisor_id:{type: DataTypes.INTEGER, allowNull: false, references:{model: 'usuarios', key:'id'}},
    mensaje: {type: DataTypes.TEXT, allowNull: false},
    fecha: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
},{
    tableName: 'mensajes_chat',
    timestamps: false
})

module.exports=mensajeChat