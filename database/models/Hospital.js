const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    usuario: {
        required : true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Hospitales' }); //Collection es para que mongo escriba la tabla como esta definida


//Para personalizar la respuesta
/*HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;

});
*/
//Fin de personalizacion de respuesta


module.exports = model('Hospital', HospitalSchema);