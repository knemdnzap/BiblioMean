//importa para mostrar de dodne viene
import client from "../models/client.js";
import role from "../models/role.js";
//Para encriptar la contraseña
import bcrypt from "bcrypt";
//Para importar el JSON Web Token
import jwt from "jsonwebtoken";
//Libreria para las fechas encriptadas
import moment from "moment";

//llega de la vista request y el response es lo q sta fuyncion va a devolver
//el response dice q va devolver
const registerClient = async (req, res) => {
  //necesita saber si alguno es vacio o el nombre o la descrpcion como atributos vienene en el json
  if (!req.body.name || !req.body.email || !req.body.password)
    //400 hay un error algo salio mal no llegaron alguno de los datos
    return res.status(400).send("Incomplete data");

  //si vienen datos priemro validamos sino existe un rol
  //va a busca por 1 solo campo q se llama nombre
  //es como si estuviera en el compas o mongo llama metodos de alla
  //mongoose es mongo en backend
  // el esta buscando en la tabla o coleccion rol en el atributo name el que le llego de la vista
  //el await va donde hicieramos algo de una respuestas que fuera hacer algo
  //el sale de nuestra margen a buscar si mongo esta o no esta  y el espera
  //hace una query a ver si esta
  const existingClient = await client.findOne({ email: req.body.email });
  //si ya existe manda el error
  if (existingClient)
    return res.status(400).send("The client already exist");

  const passHash = await bcrypt.hash(req.body.password, 10);

  const roleId = await role.findOne({ name: "user" });
  if (!role)
    return res.status(400).send({ message: "No role was assigned" });

  //sino exite crea el esquema
  const clientSchema = new client({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: roleId._id,
    dbStatus: true,
  });

  //y despuesva y lo va a guardar a otro lado
  //coloco el await para que pueda hacerlo
  //el commit tiene todo listo le confirmo con el push
  const result = await clientSchema.save();

  try {
    return res.status(200).json({
      token: jwt.sign({
        _id: result._id,
        name: result.name,
        roleId: result.roleId,
        iat: moment().unix(),
      },
      process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};

const registerAdminClient = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingClient = await client.findOne({ email: req.body.email });
  if (existingClient)
    return res.status(400).send({ message: "The client is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const clientRegister = new client({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  const result = await clientRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register client" })
    : res.status(200).send({ result });
};

// CONSULTA API GET
//listar todos los client
//funciones asincronas se pueden ejecutar multiples funciones en el tiempo
const listClient = async (req, res) => {
  //solo a post put y delete se le envian datos  en get no es necesario
  //va a la colecciond e mongo  a hacer un .find() este trae todos, recuerde findOne busca la primera coincidencia de nombre
  const clientSchema = await client.find();
  //si eso esta null o vacio !clientsSchema
  //esto puede traer varios datos ya no sirve  solo  una cosa
  //recuerden que el arrays tiene posiciones desde 0 pero item son los q allan dentro objetos
  //con el punto length se mira si hay elmntos items dentro
  //el empty client tambien se puede llevar  como objeto
  if (!clientSchema || clientSchema.length == 0)
    return res.status(400).send("Empty client list");
  //sino devuelve el json por eso se  le colcoa llavesita se toma la variable por si guarda un dato !clientSchema o varios datos  en el arraya clientSchema.length ==0
  return res.status(200).send({ clientSchema });
};

//editar role ACTUALIZAR
//para editar el rol l da a una pestañita y le entrega los datos el necesita ir a buscar un id
//el update es muy parecido al registrar el registro no permite q esos campos esten vacios
const updateClient = async (req, res) => {
  //ADMIN
  //no  deja estar vacios
  if (!req.body.name || !req.body.email || !req.body.roleId)
    //400 hay un error algo salio mal no llegaron alguno de los datos
    return res.status(400).send({ message: "Incomplete data" });

  const changeEmail = await client.findById({ _id: req.body._id });
  if (req.body.email !== changeEmail.email)
    return res.status(400).send({ message: "The email should never be changed" });

  let pass = ""

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10)
  } else{
    const clientFind = await user.findOne({ email: req.body.email })
    pass = clientFind.password;
  }

  //comete el error de reemplaza lo q esta por lo mismo no lo deja  con esto evita que haga todo el proceso de sobreescritura del mismo dato no se de si es el mismo usuario
  const existingClient = await client.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    roleId: req.body.roleId,
  });

  if (!existingClient)
    return res.status(400).send({ message: "The email cannot be changed" });

  //busca por el id y apenas lo encuentre actualiza
  //por q carajos uso body por q esta usando el json del listado que sacamos antes se consultaron la lista de roles en un json
  const clientUpdate = await client.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });

  // si esta vacio error al editar el error
  return !clientUpdate
    ? res.status(400).send({ message: "Error editing client" })
    : res.status(200).send({ message: "Client updated" });
};

//ELIMINAR
//siempre lleva request y response
const deleteClient = async (req, res) => {
  const clientDelete = await client.findByIdAndDelete({ _id: req.params["_id"] });

  //si no elimino nada
  return !clientDelete
  //angular le va a decir no muestro string a mi solo digame por json
    ? res.status(400).send({ message: "Client no found" })
    : res.status(200).send({ message: "Client deleted" });
};

const findClient = async (req, res) => {
  const clientDelete = await client.findByIdAndDelete({ _id: req.params["_id"] });
  return !clientDelete
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ clientFind });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Imcomplete data" });

  const clientLogin = await client.findOne({ email: req.body.email });
  if (!clientLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, clientLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: clientLogin._id,
          name: clientLogin.name,
          roleId: clientLogin.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};

//con este deja publico
//no hay geter and setter
//si es una funcion si lleva llaves
export default {
  registerClient,
  registerAdminClient,
  listClient,
  findClient,
  updateClient,
  deleteClient,
  login,
};
