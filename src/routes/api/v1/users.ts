import { Router } from "express";
import { UserController } from "../../../controller";
import { AuthMiddleware } from "../../../app/Middleware/AuthMiddleware";

const controller = new UserController();
const router = Router();

router.all("*", AuthMiddleware);
router.get("/", controller.all);

export default router;
