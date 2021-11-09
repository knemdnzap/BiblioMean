import mongoose from "mongoose";

const dbConnection = async () => {
  //escribir solo try
  //en el try va el codigo que nosotros ponemos
  //el if y else es cuando sepamos que error se presenta  por ejemplo divide por 0
  //cuando no sabemos que error puede salir  lo atrapamos en un cacth para esas exepciones
try {
    //para conectarse con mongo use los datos en env con process.env saca las variables de entorno
    //nunca pueden saber ni la url
    //ni el nombre de la base de datos se deben ver aca con esa url la comvierte  y no aparece la url por ningun lado en su propia conversion de mongo
await mongoose.connect(process.env.DB_CONNECTION, {
useNewUrlParser: true,
useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: ok");
} catch (error) {
console.log("Error connecting to MongoDB: \n" + error);
}
};
//dentro de llave le estamos diciendo q estamos exportando esta funcion
//todo este archivo saca al index para la conexn  de la base de datos
//se suele exportar todo el archivo para sacar funciones o variables
//es una funcion va con llavesita
export default { dbConnection };
