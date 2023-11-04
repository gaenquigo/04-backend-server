const { response, request } = require("express");
const Medico = require("../database/models/Medico");
const Usuario = require("../database/models/Usuario");
const Hospital = require("../database/models/Hospital");


const buscarTodo = async (req = request, res = response) => {

    const valorBusqueda = req.params.busqueda;
    const regex = new RegExp(valorBusqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })

    ]);

    res.status(200).json({
        OK: true,
        msg: 'la busqueda generica todas las colecciones',
        usuarios,
        medicos,
        hospitales,
        valor: valorBusqueda
    });
}

const buscarTodoColeccion = async (req = request, res = response) => {

    const valorColeccion = req.params.coleccion;
    const valorBusqueda = req.params.busqueda;
    const regex = new RegExp(valorBusqueda, 'i');

    let data = [];

    switch (valorColeccion) {
        case 'Medico':

         data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img')
                                                    .populate('hospital' ,'nombre img');
            
            break;
        case 'Hospital':
           data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;
    
        case 'Usuario':

            data =  await Usuario.find({ nombre: regex });
            
            break;
        default:

            return res.status(400).json({
                OK : false,
                msg : 'No existe una collecion valida para la busqueda'
            });
            break;
    }

    res.status(200).json({
        OK: true,
        msg: 'la busqueda generica por coleccion',
        resultado : data,
        valor: valorBusqueda
    });
}

module.exports = {
    buscarTodo,
    buscarTodoColeccion
}