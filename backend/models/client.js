// 4 - Crear el proceso para registrar clientes (name, email, password, registerDate, dbStatus)
// 5 - Crear el proceso para registrar proveedores (name, address, registerDate.)

import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        yearPublication: String,
        registerDate: { type: Date, default: Date.now },
        dbStatus: Boolean,
    });

const client = mongoose.model("client", clientSchema);

export default client;
