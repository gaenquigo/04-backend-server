const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../database/models/Hospital');
const { generaToken } = require('../helpers/jwt')

const getHospitales = async (req, res) => {

    //con Filtro
   // const usuarios = await Usuario.find({}, 'nombre email password google role');

    // Sin Filtro 
    const hospitales =  await Hospital.find({}, 'nombre img')
    .populate('usuario', 'nombre img');
    const uid =  req.uid;

    res.status(200).json({
        "OK": true,
        hospitales,
        uid
    });

}


const addHospital= async (req = request, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({usuario : uid, ...req.body});

    try {
        
        const hospitalDB = await hospital.save();
        res.status(201).json({
            OK: true,
            hospital : hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "OK": false,
            "msg": "Erro Inesperado ..."
        });

    }
}

const actualizarHospital= async (req = request, res = response) => {

    try {

        const id = req.params.id;
        const uid = req.uid;
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                OK: false,
                msg: 'El Hospital no se encuentra registrado...'
            });
        }

        const { nombre } = req.body;
        const cambiosHospital = {
            nombre,
            usuario : uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });
        res.status(200).json({
            OK: true,
            msg : 'Hospital Actualizado',
            hospital : hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "OK": false,
            msg: 'Error inesperado en el servidor'
        });
    }
}

const borrarHospital = async (req = request, res = response) => {

    try {

        const id = req.params.id;

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            OK: true,
            msg: "Hospital Eliminado.."
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
    getHospitales,
    addHospital,
    actualizarHospital,
    borrarHospital
}