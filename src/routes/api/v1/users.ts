import { Router } from "express";
import UserController from "../../../controller/UserController";

const controller = new UserController();
const router = Router();

router.get("/", controller.all);

export default router;
