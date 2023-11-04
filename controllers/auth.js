const { request, response, json } = require('express');
const Usuario = require('../database/models/Usuario');
const bcrypt = require('bcryptjs');
const { generaToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVirify');



const validarLogin = async (req = request, res = response) => {

    try {
        const { email, password } = req.body;
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(400).json({
                OK: false,
                msg: 'usuario no se encuentra registrado'
            });
        }

        const validaCredenciales = await bcrypt.compareSync(password, usuarioDB.password);

        if (!validaCredenciales) {
            return res.status(400).json({
                OK: false,
                msg: 'Credenciales erradas'
            })
        }

        //Generando JsonWebToken

        const token = await generaToken(usuarioDB.id);

        res.status(200).json({
            OK: true,
            token,
            msg: 'Acceso correcto'
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            OK: false,
            msg: 'Error inesperado en el servidor...'
        });
    }

}

const googleSingIn = async (req = request, res = response) => {
    const googletoken = req.body.token;

    try {
        const { email, name, picture } = await googleVerify(googletoken);

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;
        if (!usuarioDB) {

            usuario = new Usuario({
                nombre: name,
                email,
                img: picture,
                google: true,
                password: '123456'
            })
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(usuario.password, salt);

            usuario.password = hash;

            await usuario.save();
        } else {

            usuario = usuarioDB;
            usuario.google = true;
        }




        const token = await generaToken(usuario.id);

        return res.json({
            OK: true,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            msg: 'El token no es valido'
        });

    }



}

const renovarToken = async (req = request, res = response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);
    const token = await generaToken(uid);

    res.status(200).json({
        OK: true,
        usuario,
        token
    });

}

module.exports = {
    validarLogin,
    googleSingIn,
    renovarToken
}