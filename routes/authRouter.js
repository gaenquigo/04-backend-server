/*
    Route : /api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const {validarLogin, googleSingIn, renovarToken} =  require('../controllers/auth');
const { validarToken } = require('../middlewares/validarJWT');


const router =  Router();



router.post('/',
[
    check('password','El password es requerido').not().isEmpty(),
    check('email','El correo es requerido').isEmail(),
    validarCampos
],
validarLogin
);



router.post('/google',
[
    check('token','El token no existe').not().isEmpty(),
    validarCampos
],
googleSingIn
);


router.get('/renovar',
validarToken,
renovarToken
);
module.exports = router;