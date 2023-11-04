const { response, request } = require("express");
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Crea un nombre aleatorio
const { actialzarImagen } = require("../helpers/actualizarImagen");



const fileUpload = (req = request, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            OK: false,
            msg: 'No hay archivo para subir'
        });
    }
    const tipoValidos = ['Medicos', 'Hospitales', 'Usuarios'];
    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            OK: false,
            msg: 'El tipo no esta en la lista.. Medicos/Hospitales/Usuarios'
        })
    }


    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    const extensionesPermitidas = ['jpe', 'jpeg', 'PNG', 'gif', 'png', 'JPG', 'JPEG','webp']

    if (!extensionesPermitidas.includes(extension)) {
        return res.status(400).json({
            OK: false,
            msg: 'La extensión no está permitida'
        });
    }

    // Genera nombre aleatorio para el archivo
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //Crear la ruta del archivo.
    const path = `./upload/${tipo}/${nombreArchivo}`;
    console.log(path);

    // Use the mv() para mover el archivo a la ruta del servidor
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                OK: false,
                msg: `No se puede cargar el archivo ${err}`
            });
        }

        actialzarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            OK: true,
            archivo: nombreArchivo,
            msg: 'Imagen Arriba'
        });

    });


}

const mostrarImagen = (req = request, res = response)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg =  path.join(__dirname,`../upload/${tipo}/${foto}`);


    //validar si la imagen existe
    
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }else{
        const ingNotExist = path.join(__dirname,`../upload/noexiste.png`);
        res.sendFile(ingNotExist);
    }

}

module.exports = {
    fileUpload,
    mostrarImagen
}