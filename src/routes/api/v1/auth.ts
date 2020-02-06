import { Router } from "express";
import { AuthController } from "../../../controller";

const controller = new AuthController();
const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
