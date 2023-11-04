const express = require('express');
var cors = require('cors')

require('dotenv').config();
const { dbConnection } = require('./database/config');
const { json } = require('express');
const app = express();


//CORS PARA ACCESOS
app.use(cors());
app.use(json());

app.use(express.static('public'));


app.use('/api/usuarios', require('./routes/usuariosRouter'));
app.use('/api/hospitales', require('./routes/hospitalRouter'));
app.use('/api/medicos', require('./routes/medicosRouter'));
app.use('/api/buscar', require('./routes/busquedasRouter'));
app.use('/api/buscar/coleccion', require('./routes/busquedasRouter'));
app.use('/api/upload', require('./routes/uploadsRouter'));
app.use('/api/login', require('./routes/authRouter'));

//Coneccion a la base de datos;

dbConnection();

app.listen(process.env.PORT, ()=>{
    console.log('Se esta ejecutando el puerto '+process.env.PORT);
});