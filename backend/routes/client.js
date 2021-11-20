//importa express
import express from "express";
import client from "../controllers/client.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router();

//http://localhost:3001/api/client/registerClient

//Regitrar
router.post("/registerClient", auth, admin, client.registerClient);
router.post("/registerAdminClient", auth, admin, client.registerAdminClient);
router.post("/login", client.login);

//Obtener
router.get("/listClient", auth, admin, client.listClient);
router.get("/findUser", auth, admin, client.findClient);

//actualizar role
router.put("/updateClient", auth, admin, client.updateClient);

//eliminar role
//esta por debajo la papelera y lo elimina
router.delete("/deleteClient/:_id", auth, admin, client.deleteClient);

export default router