import obtenerDatosIndice from "../services/indexServices.js"
import Index from "../models/indexModels.js"

const obtenerIndice = async(req,res)=>{
    try{
        const indices = await Index.find();
        res.status(200).json(indices)
    }catch(error){
        res.status(500).json({ message: "Error al obtener los índices", error });
    }
}
const guardarIndice = async (req,res)=>{
    try{
        await obtenerDatosIndice();
        res.status(200).json({message:"Datos del indice guardados correctamente"})
    }catch(error){
        res.status(500).json({ message: "Error al guardar los datos del índice", error });
    }
}
export default { obtenerIndice, guardarIndice};
