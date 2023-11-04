/*
API : api/hospitales/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {getHospitales, addHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarToken } = require('../middlewares/validarJWT');
const {validarCampos} =  require('../middlewares/validarCampos');

const router = Router();


router.get("/",validarToken , getHospitales);

router.post("/",
    [
        validarToken,
        check('nombre','El nombre del hospital es requerido'),
        validarCampos
    ]
    , addHospital);

router.put('/:id',
    [
        validarToken,
        check('nombre','El nombre del hospital es requerido'),
        validarCampos
    ]
    , actualizarHospital
);

router.delete('/:id',
    validarToken,
    borrarHospital
);


module.exports = router;

