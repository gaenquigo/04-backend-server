const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../database/models/Usuario');
const { generaToken } = require('../helpers/jwt')

const getUsuarios = async (req = request, res = response) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);
    //con Filtro
    //const usuarios = await 

    //const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([

        Usuario
            .find({}, 'nombre email password google role img')
            .skip(desde)
            .limit(5),
        Usuario.count()

    ]);

    // Sin Filtro 
    //const usuarios =  await Usuario.find();
    const uid = req.uid;

    res.status(200).json({
        usuarios: usuarios,
        total: total,
        "OK": true,
        uid,
        "msg": "Obtiene la lista de usuarios "
    });

}


const addUsuario = async (req, res = response) => {

    try {
        const { email, password } = req.body;
        const existeCorreo = await Usuario.findOne({ email });
        if (existeCorreo) {
            return res.status(400).json({
                "OK": false,
                "msg": "Correo ya está en Uso"
            });
        }
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        const usuario = new Usuario(req.body);
        usuario.password = hash;
        await usuario.save();
        const token = await generaToken(usuario.id);
        res.status(201).json({
            "OK": true,
            usuario,
            token,
            "msg": "se ha creado el Usuario"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "OK": false,
            "msg": "Erro Inesperado ..."
        });

    }
}

const actualizarUsuario = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        const usuarioBD = await Usuario.findById(id);
        if (!usuarioBD) {
            return res.status(404).json({
                OK: false,
                msg: 'El Usuario no se encuentra registrado...'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioBD.email !== email) {
            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    OK: false,
                    msg: 'El email ya esta en uso'
                });
            }
        }
        if (!usuarioBD.google || usuarioBD.email === email ) {
            campos.email = email;
        } else {
            return res.status(400).json({
                OK: false,
                msg: 'El usuario de google no puede cambiar su email'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });

        res.status(200).json({
            OK: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "OK": false,
            msg: 'Error inesperado en el servidor'
        });
    }
}

const borrarUsuario = async (req = request, res = response) => {

    try {

        const id = req.params.id;

        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        res.status(200).json({
            OK: true,
            id: id,
            msg: "Usuario Eliminado.."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            msg: "Error inesperado en el servidor..."
        });
    }

}

module.exports = {
    getUsuarios,
    addUsuario,
    actualizarUsuario,
    borrarUsuario
}