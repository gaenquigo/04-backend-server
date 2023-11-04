const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos')
const { getUsuarios, addUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarToken } = require('../middlewares/validarJWT');

const router = Router();


router.get("/", validarToken, getUsuarios);

router.post("/",
    [
        check('nombre', 'El Campo nombre es requerido').not().notEmpty(),
        check('password', 'La contraseña es requerida').not().notEmpty(),
        check('email', 'El email es requerido').isEmail(),
        validarCampos
    ]
    , addUsuario);

router.put('/:id',
    [
        validarToken,
        check('nombre', 'El Campo nombre es requerido').not().notEmpty(),
        check('role', 'El role es requerido').not().notEmpty(),
        check('email', 'El email es requerido').isEmail(),
        validarCampos
    ]
    , actualizarUsuario
);

router.delete(
    '/:id',
    validarToken,
    borrarUsuario
);


module.exports = router;

