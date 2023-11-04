const jwt = require('jsonwebtoken');


const generaToken = (uid) =>{

    return new Promise((resolve, reject) => {

        const payload = ({
            uid
        });
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h',
            algorithm: 'HS512'
        }, (err, token) => {
    
            if (err) {
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
    
        });
    });

} 

module.exports = {
    generaToken
}
