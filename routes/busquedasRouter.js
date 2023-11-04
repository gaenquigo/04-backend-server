
const {Router} =  require('express');
const { buscarTodo, buscarTodoColeccion } = require('../controllers/busquedas');
const { validarToken } = require('../middlewares/validarJWT');


const router =  Router();


router.get('/:busqueda',validarToken,buscarTodo);
router.get('/:coleccion/:busqueda',validarToken,buscarTodoColeccion);




module.exports=router;
