import { Router } from "express";
import admin from "./admin";
import auth from "./auth";
import user from "./users";

const routes = Router();

routes.use("/admin", admin);
routes.use("/auth", auth);
routes.use("/user", user);

export default routes;
