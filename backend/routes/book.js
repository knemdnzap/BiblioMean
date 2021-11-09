//importa express
import express from "express";
import book from "../controllers/book.js";
const router = express.Router();

//http://localhost:3001/api/book/registerBook
router.post("/registerBook", book.registerBook);
router.get("/listBook", book.listBook);
//actualizar role
router.put("/updateBook", book.updateBook);
// no lleva llaves por q no es funcion

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteBook/:_id", book.deleteBook);

export default router