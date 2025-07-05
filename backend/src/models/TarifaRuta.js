const {DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const TarifaRuta= sequelize.define('tarifas_ruta',{
    origen: {type: DataTypes.STRING, allowNull: false},
    destino: {type: DataTypes.STRING, allowNull: false},
    tipo_carga: {type: DataTypes.STRING, allowNull: true},
    tipo_vehiculo: {type: DataTypes.STRING, allowNull: true},
    tarifa_base: {type: DataTypes.DECIMAL, allowNull:false },
    tarifa_kg: {type: DataTypes.DECIMAL, defaultValue: 0}
},{
    tableName: 'tarifas_ruta',
    timestamps: false
}
)
module.exports=TarifaRuta;