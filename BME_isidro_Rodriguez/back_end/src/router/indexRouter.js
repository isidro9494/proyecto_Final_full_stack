import express from "express";
import indexController from "../controllers/indexController.js";

const router = express.Router();
router.get("/", indexController.obtenerIndice);
router.post("/guardar", indexController.guardarIndice);


export default router;