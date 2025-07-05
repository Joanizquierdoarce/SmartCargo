const Sequelize = require('sequelize')
const sequelize = require('../../config/db');
const Usuario = require('./usuario');
const Carga= require('./Carga'); 
const TarifaRuta= require('./TarifaRuta');
const Vehiculo= require('./vehiculo');
const Viajes = require('./Viajes');
const Incidencia= require('./incidencias');
const mensajesChat= require('./mensajeChat');

Carga.belongsTo(Usuario, { as: 'cliente', foreignKey: 'cliente_id'});
Usuario.hasMany(Carga, { as: 'cargas_cliente', foreignKey: 'cliente_id'});
Vehiculo.belongsTo(Usuario, { as: 'transportador_vehiculo', foreignKey: 'propietario_id'});
Usuario.hasMany(Vehiculo, {as: 'vehiculos', foreignKey: 'propietario_id'});

Viajes.belongsTo(Carga, {foreignKey: 'carga_id'});
Viajes.belongsTo(Usuario, {as: 'transportador', foreignKey: 'transportador_id'});
Viajes.belongsTo(Vehiculo, {foreignKey:'vehiculo_id'});

Carga.hasOne( Viajes, {foreignKey: 'carga_id'});
Usuario.hasMany(Viajes, {as: 'viajes_transportador', foreignKey: 'transportador_id'});
Vehiculo.hasMany(Viajes, { foreignKey: 'vehiculo_id'});

Incidencia.belongsTo(Viajes, {foreignKey:'viaje_id'});
Viajes.hasMany(Incidencia, {foreignKey: 'viaje_id'});
Incidencia.belongsTo(Usuario, {foreignKey: 'usuario_id'});
Usuario.hasMany(Incidencia, {foreignKey: 'usuario_id'});
mensajesChat.belongsTo(Viajes, {foreignKey: 'viaje_id'});
Viajes.hasMany(mensajesChat, {foreignKey: 'viaje_id'});
mensajesChat.belongsTo(Usuario, {foreignKey: 'emisor_id'});
Usuario.hasMany(mensajesChat, { foreignKey: 'emisor_id'})
module.exports={
    sequelize,
    Sequelize, 
    Usuario,
    Carga,
    TarifaRuta,
    Vehiculo,
    Viajes,
    Incidencia,
    mensajesChat
}