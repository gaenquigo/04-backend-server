const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const dbConnection = async()=>{
    main().catch(err => {
        console.log(err);

        throws.Error("Erro al conectar");
    });

    async function main() {
    await mongoose.connect(process.env.DB_CNN),
   
    
    
    console.log('DB Online');
    

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }
} 

module.exports={

    dbConnection
}