//importa express
import express from "express";
import book from "../controllers/book.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router();

//http://localhost:3001/api/book/registerBook
router.post("/registerBook", auth, admin, book.registerBook);
//Obtener libro
router.get("/listBook", auth, book.listBook);
router.get("/findBook", auth, book.findBook);
//actualizar role
router.put("/updateBook", auth, admin, book.updateBook);
// no lleva llaves por q no es funcion

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteBook/:_id", auth, admin, book.deleteBook);

export default router