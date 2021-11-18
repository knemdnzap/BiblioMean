//importamos express
//variable fuctsia guarda y naranja es de donde lo llamos
import express from "express";
//se encraga de configuraciones horribes al backen post man, angular ,etc
import cors from "cors";
//base de datos conectarla
import db from "./db/db.js";

//necesitamos extenson que reconozca que tenemos variables de entorno
import dotenv from "dotenv";
// que esto se ejecute automaticamente en el servidor
//al eejcutar el servidor el index detecte el .env y las carga de una a memoria

//trae la del controler y route
import book from "./routes/book.js"
import client from "./routes/client.js"
import role from "./routes/role.js"
import vendor from "./routes/vendor.js"

dotenv.config();

//significa aplicacion backend por express
// lo q esta en app ejecuta todo lo q esta en servidor express
const app = express();
//que nuestro servidor de express solo va a usar json  envio y recibos son son
app.use(express.json());
//reglas de conexion si angular react y vue se puedan conectar con el backedn express decide si lo deja entrar
//herramientas oficiales las deja entrar
app.use(cors());

//q use el import
app.use("/api/book", book);
app.use("/api/client", client);
app.use("/api/role", role);
app.use("/api/vendor", vendor);

//escuchar el siguiente puerto
//para hacer q una funcion acepte optro parametro
//con eso creamos un servidor express backend
app.listen(process.env.PORT, () =>
console.log("Backend server running on port:" + process.env.PORT)
);

db.dbConnection();