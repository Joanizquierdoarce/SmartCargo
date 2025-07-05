const Usuario= require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register= async( req, res)=>{
    try{
        const hash= await bcrypt.hash(req.body.contrasena, 10);
        const user = await Usuario.create({...req.body, contrasena: hash});
        res.status(201).json(user)
    }catch(err){
        res.status(400).json({ error: err.message})
    }
}

exports.login = async (req, res) =>{
        const user = await Usuario.findOne({where:{correo: req.body.correo}});
        if (!user)
            return res.status(400).json({ error: "contraseña incorrecta"});
        const match= await bcrypt.compare(req.body.contrasena, user.contrasena)
        if (!match)
            return res.status(401).json({error: "contraseña no valida"})
        const token = jwt.sign({id:user.id, rol:user.rol}, process.env.JWT_SECRET);
        res.json({ token, rol: user.rol, id: user.id })}
