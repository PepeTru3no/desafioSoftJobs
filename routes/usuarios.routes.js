import { Router } from "express";
import { getUariosController, loginController, registerController } from "../controllers/usuarios.controller.js";
import { getUserMiddleware, loginMiddleware, registerMiddleware } from "../middleware/usuarios.middleware.js";

const router = Router();

router.get('/usuarios', getUserMiddleware, getUariosController);
router.post('/usuarios', registerMiddleware ,registerController);
router.post('/login',loginMiddleware, loginController);

export default router;