//importa para mostrar de dodne viene
// libros (name, author, yearPublication, registerDate, pages, gender, price)
import book from "../models/book.js";
//llega de la vista request y el response es lo q sta fuyncion va a devolver
//el response dice q va devovler
const registerBook = async (req, res) => {
//necesita saber si alguno es vacio o el nombre o la descrpcion como atributos vienene en el json
if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.pages || !req.body.gender || !req.body.price)
//400 hay un error algo salio mal no llegaron alguno de los datos
return res.status(400).send("Incomplete data");

//si vienen datos priemro validamos sino existe un rol
//va a busca por 1 solo campo q se llama nombre
//es como si estuviera en el compas o mongo llama metodos de alla
//mongoose es mongo en backend
// el esta buscando en la tabla o coleccion rol en el atributo name el que le llego de la vista
//el wait ba dodne hcieamos algo de una respuestas que fuera hacer algo
//el sale de nuestra margen a buscar si mongo esta o no esta  y el espera
//hace una query  haber si esta
const existingBook = await book.findOne({name: req.body.name});
//si ya existe manda el error
if (existingBook) return res.status(400).send("The book already exist");

//sino exite crea el esquema
const bookSchema = new book({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
    dbStatus: true,
})

//y despuesva y lo va a guardar a otro lado
//coloco el await para que pueda hacerlo
//el commit tiene todo listo le confirmo con el push
const result = await bookSchema.save();
//si eso esta vacio osea con signod e admiracion
if(!result) return res.status(400).send("Failed to register book");

return res.status(200).send({result});
};

//CONSULTA API GET
//listar todos los clients
//funciones asincronas se pueden ejecutar multiples funciones en el tiempo
const listBook = async (req, res)=> {
//solo a post put y delete se le envian datos  en get no es necesario
//va a la colecciond e mongo  a hacer un .find() este trae todos, recuerde findOne busca la primera coincidencia de nombre
const bookSchema = await book.find();
//si eso esta null o vacio !clientsSchema
//esto puede traer varios datos ya no sirve  solo  una cosa
//recuerden que el arrays tiene posiciones desde 0 pero item son los q allan dentro objetos
//con el punto length se mira si hay elmntos items dentro
//el empty client tambien se puede llevar  como objeto
if(!bookSchema || bookSchema.length == 0 ) return res.status(400).send("Empty book list");
//sino devuelve el json por eso se  le colcoa llavesita se toma la variable por si guarda un dato !clientSchema o varios datos  en el arraya clientSchema.length ==0
return res.status(200).send({bookSchema})
}

//editar role ACTUALIZAR
//para editar el rol l da a una pestañita y le entrega los datos el necesita ir a buscar un id
//el update es muy parecido al registrar el registro no permite q esos campos esten vacios
const updateBook = async(req, res) =>{//ADMIN
//no  deja estar vacios
if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.pages || !req.body.gender || !req.body.price)
//400 hay un error algo salio mal no llegaron alguno de los datos
return res.status(400).send("Incomplete data");

//comete el error de reemplaza lo q esta por lo mismo no lo deja  con esto evita que haga todo el proceso de sobreescritura del mismo dato no se de si es el mismo usuario
const existingBook = await book.findOne({name: req.body.name, author: req.body.author, yearPublication: req.body.yearPublication, pages: req.body.pages, gender: req.body.gender, price: req.body.price});
if(existingBook) return res.status(400).send("The book already exist");

//busca por el id y apenas lo encuentre actualiza
//por q carajos uso body por q esta usando el json del listado que sacamos antes se consultaron la lista de roles en un json
const bookUpdate = await book.findByIdAndUpdate(req.body._id,{name: req.body.name, author:req.body.author, yearPublication:req.body.yearPublication, pages: req.body.pages, gender: req.body.gender, price: req.body.price})

// si esta vacio error al ediatr el error
return !bookUpdate
? res.status(400).send("Error editing book")
: res.status(200).send({bookUpdate});
}

//ELIMINAR
//siempre lleva request y response
const deleteBook = async(req,res)=>{
  const bookDelete = await book.findByIdAndDelete({_id: req.params["_id"]})

  //si no elimino nada
  return !bookDelete
  //angular le va a decir no muestro string a mi solo digame por json
  ? res.status(400).send("Book no found")
  : res.status(200).send("Book deleted")
}

//con este deja publico
//no hay geter and setter
//si es una funcion si lleva llaves
export default { registerBook, listBook, updateBook, deleteBook };