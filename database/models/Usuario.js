const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }, img: {
        type: String
    },
});

//Para personalizar la respuesta
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password,  ...object } = this.toObject();
    object.uid = _id;
    console.log(object);
    return object;

});

//Fin de personalizacion de respuesta


module.exports = model('Usuario', UsuarioSchema);