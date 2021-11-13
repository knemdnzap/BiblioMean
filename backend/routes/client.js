//importa express
import express from "express";
import client from "../controllers/client.js";
const router = express.Router();

//http://localhost:3001/api/client/registerClient

//Regitrar
router.post("/registerClient", client.registerClient);
router.post("/login", client.login);

//Obtener
router.get("/listClient", client.listClient);

//actualizar role
router.put("/updateClient", client.updateClient);

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteClient/:_id", client.deleteClient);

export default router