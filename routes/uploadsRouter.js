const {Router} =  require('express');
const DFfileUpload = require('express-fileupload'); //permite la carga de archivos mediante su middleware
const {fileUpload, mostrarImagen  } = require('../controllers/upload');
const { validarToken } = require('../middlewares/validarJWT');


const router =  Router();
// default options
router.use(DFfileUpload()); // middleware para subir imagen

router.put('/:tipo/:id',validarToken,fileUpload);

router.get('/:tipo/:foto',mostrarImagen);

module.exports=router;
