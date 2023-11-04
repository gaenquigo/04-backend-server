// Importacion que permite (fs) manipular los archivos del sistema.
const fs = require('fs');
const Medico = require('../database/models/Medico');
const Hospital = require('../database/models/Hospital');
const Usuario = require('../database/models/Usuario');

const borrarImagen = (path) =>{
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actialzarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'Medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('Medico no existe o no es valido');
                return false;
            }
            pathViejo = `./upload/${tipo}/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'Hospitales':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                console.log('Hospital no existe o no es valido');
                return false;
            }
            pathViejo = `./upload/${tipo}/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'Usuarios':
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                console.log('Hospital no existe o no es valido');
                return false;
            }
            pathViejo = `./upload/${tipo}/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
    }
}


module.exports = {
    actialzarImagen
}