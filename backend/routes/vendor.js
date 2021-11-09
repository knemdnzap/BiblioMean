//importa express
import express from "express";
import vendor from "../controllers/vendor.js";
const router = express.Router();

//http://localhost:3001/api/vendor/registerVendor
router.post("/registerVendor", vendor.registerVendor);
router.get("/listVendor", vendor.listVendor);

//actualizar role
router.put("/updateVendor", vendor.updateVendor);

//eliminar role
//esta por debaj la papelera y lo elimina
router.delete("/deleteVendor/:_id", vendor.deleteVendor);

export default router