import mongoose from "mongoose";

const indexSchema = new mongoose.Schema({
    nombre: { type: String, required: true, default: 'Desconocido' },
    simbolo: { type: String, required: true, unique: true },
    precio: { type: Number, required: true, default: 0 },
    sector: { type: String, default: 'Desconocido' },
    grupo: { type: String, default: 'Desconocido' },
    bpa: { type: Number, default: 0 },
    per: { type: Number, default: 0 },
    beneficios: { type: Number, default: 0 },
    capitalizacion: { type: Number, default: 0 },
    ingresos: { type: Number, default: 0 },
    fechaActualizacion: { type: Date, default: Date.now },
});
export default mongoose.model('Index', indexSchema);