const { response, request } = require('express');
const Medico = require('../database/models/Medico');
const Hospital = require('../database/models/Hospital');

const getMedicos = async (req, res) => {

    //con Filtro
    // const usuarios = await Usuario.find({}, 'nombre email password google role');

    // Sin Filtro 
    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre');
    const uid = req.uid;

    console.log(uid);
    res.status(200).json({
        "OK": true,
        medicos,
        uid
    });

}


const addMedico = async (req = request, res = response) => {

    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });
    try {

        const medicoDB = await medico.save(medico);

        res.status(201).json({
            "OK": true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "OK": false,
            "msg": "Erro Inesperado ..."
        });

    }
}

const actualizarMedico = async (req = request, res = response) => {

    try {

        const id = req.params.id;
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                OK: false,
                msg: 'El Medico no se encuentra registrado...'
            });
        }

        const { hospital, nombre } = req.body;

        const hospitalDB = await Hospital.findById(hospital);

        if (!hospitalDB) {
            return res.status(404).json({
                OK: false,
                msg: 'El hospital no existe'

            });
        }

        const uid = req.uid;
        const datosActualizado = {
            nombre,
            hospital,
            usuario: uid

        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, datosActualizado, { new: true });

        res.status(200).json({
            OK: true,
            msg: 'Medico Actualizado',
            medicoActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "OK": false,
            msg: 'Error inesperado en el servidor'
        });
    }
}

const borrarMedico = async (req = request, res = response) => {

    try {

        const id = req.params.id;

        const medicoEliminado = await Medico.findByIdAndDelete(id);

        res.status(200).json({
            OK: true,
            msg: "Medico Eliminado..",
            medicoEliminado
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
    getMedicos,
    addMedico,
    actualizarMedico,
    borrarMedico
}