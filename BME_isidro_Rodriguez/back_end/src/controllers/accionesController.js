import Accion from "../models/accionesModels.js"


export const getAcciones = async (req,res)=>{
    try{
        const accion = await Accion.find();
        res.status(200).json(accion)
    }catch(error){
        res.status(500).json({error:"Error al obtener acciones"});
    }
}
export const crearAccion = async (req,res)=>{
    try{
        const nuevaAccion = new Accion(req.body);
        await nuevaAccion.save()
        res.status(200).json(nuevaAccion)
    }catch(error){
        res.status(500).json({error:"Error al crear la accion"});
    }
}
export const modificaAccion = async (req, res) => {
    try {
        const { id } = req.params;
        const accionExistente = await Accion.findById(id);

        if (!accionExistente) {
            return res.status(404).json({ error: "Acción no encontrada" });
        }

        const accionMody = await Accion.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(accionMody);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar acción" });
    }
};

export const eliminarAccion = async (req,res)=>{
    try{
        const {id}= req.params;
        await Accion.findByIdAndDelete(id);
        res.status(200).json({message:"accion eliminada"})
    }catch(error){
        res.status(500).json({error:"Error al eliminar accion"});
    }
}