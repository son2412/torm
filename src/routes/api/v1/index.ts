import { Router } from "express";
import admin from "./admin";
import user from "./users";

const routes = Router();

routes.use("/admin", admin);
routes.use("/user", user);

export default routes;
