/**
 * API : api/medicos/
 * 
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, addMedico, actualizarMedico, borrarMedico  } = require('../controllers/medicos');
const { validarToken } = require('../middlewares/validarJWT');
const {validarCampos} =  require('../middlewares/validarCampos');

const router = Router();


router.get("/", validarToken, getMedicos);

router.post("/",
    [
        validarToken,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital es necesario').isMongoId(),
        validarCampos
    ]
    , addMedico);

router.put('/:id',
    [
        validarToken,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital es necesario').isMongoId(),
        validarCampos

    ]
    , actualizarMedico
);

router.delete(
    '/:id',
    validarToken,
    borrarMedico
);


module.exports = router;

