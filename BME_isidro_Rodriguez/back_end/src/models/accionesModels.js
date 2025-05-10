import mongoose from "mongoose";

const accionesSchema = new mongoose.Schema({
    nombreInversion: { type: String, required: true},
    fechaDeCompra: { type: Date, required:true},
    NumeroAcciones: { type: Number, required: true},
    Precio: { type: Number, required: true},
    costoInversion:{ type: Number},
    valorActual: { type: Number},
   
});
export default mongoose.model('Accion', accionesSchema);