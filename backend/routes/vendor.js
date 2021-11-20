//importa express
import express from "express";
import vendor from "../controllers/vendor.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router();

//http://localhost:3001/api/vendor/registerVendor
router.post("/registerVendor", auth, admin, vendor.registerVendor);
router.get("/listVendor", auth, admin, vendor.listVendor);

//actualizar role
router.put("/updateVendor", auth, admin, vendor.updateVendor);

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteVendor/:_id", auth, admin, vendor.deleteVendor);

export default router