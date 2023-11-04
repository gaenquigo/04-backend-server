const { request, response } = require("express");
const jwt =  require('jsonwebtoken');


const validarToken = (req = request, res = response, next)=>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            OK: false,
            mgs : 'No existe token para validar'
        })
    }
 
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            OK: false,
            msg : 'Token Invalido..'
        });
    }
}

module.exports ={
    validarToken
}