import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({message: 'Token no proporcionado'});
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.usuario=decoded;
        next();
    }catch (err) {
        return res.status(401).json({message: 'Token inválido o expirado'});
    }
}