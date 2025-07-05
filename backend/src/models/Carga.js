const {DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const Carga= sequelize.define('cargas',{
    origen: {type: DataTypes.STRING, allowNull: false},
    destino: {type: DataTypes.STRING, allowNull: false},
    tipo_carga:{type: DataTypes.STRING, allowNull: false},
    peso: {type: DataTypes.FLOAT, allowNull: false},
    descripcion: {type: DataTypes.TEXT, allowNull: false},
    estado: {type: DataTypes.STRING, defaultValue:'pendiente'},
    valor_estimado: {type:DataTypes.DECIMAL, allownull: false}
}, {
    tableName: 'cargas',
    timestamps:true,
    createdAt: 'fecha_creacion',
    updatedAt: false
});

module.exports = Carga;