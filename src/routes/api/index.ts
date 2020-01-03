import { Router } from "express";
import ApiV1Router  from "./v1";

const routes = Router();

routes.use("/v1", ApiV1Router);

export default routes;
