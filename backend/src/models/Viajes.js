const {DataTypes}= require('sequelize')
const sequelize  = require('../../config/db')

const Viajes= sequelize.define('Viajes', {
    carga_id:{type: DataTypes.INTEGER, allowNull: false},
    transportador_id:{type: DataTypes.INTEGER, allowNull: false},
    vehiculo_id:{ type:DataTypes.INTEGER, allowNull:false},
    fecha_inicio:{type:DataTypes.DATE, allowNull:true},
    fecha_entrega:{type: DataTypes.DATE, allowNull: true},
    estado:{ type:DataTypes.STRING(50), allowNull: false}
},
{
    tableName:'viajes',
    timestamps:false
})

module.exports=Viajes