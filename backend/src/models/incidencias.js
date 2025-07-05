const {DataTypes}= require('sequelize')
const sequelize= require('../../config/db')

const Incidencia= sequelize.define('incidencia',{
    viaje_id:{type: DataTypes.INTEGER, allowNull: false, references: {model:'viajes', key:'id'}},
    usuario_id:{type: DataTypes.INTEGER, allowNull: false, references: {model: 'usuarios', key:'id'}},
    descripcion:{type: DataTypes.TEXT, allowNull: false},
    fecha:{type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estado: {type: DataTypes.STRING, defaultValue: 'pendiente'}
    },
    {
        tableName: 'incidencias',
        timestamps: false
    }
)

module.exports=Incidencia