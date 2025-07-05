const jwt =require('jsonwebtoken')
require('dotenv').config();

const authMiddleware = (rolesPermitidos = []) =>{
    return (req, res, next) =>{
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({ error: 'Token no proporcionado'});
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario=decoded;
            if(
                rolesPermitidos.length>0 &&
                !rolesPermitidos.includes(decoded.rol)
            ){
                return res.status(403).json({ error: 'Acceso denegado'});
            }
            next();
        }catch(err){
            return res.status(401).json({ error: 'Token inválido o expirado'});
        }
    };
};

module.exports=authMiddleware;