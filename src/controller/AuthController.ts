import { Request, Response } from "express";
import { AuthRepository } from "@repository/index";
import { Auth } from "@service/Auth";
import { ApiRespone } from "@service/ApiRespone";
export class AuthController {
  async signIn(req: Request, res: Response) {
    const data = req.body;
    try {
      const result = await new AuthRepository().login(data);
      res.json(result);
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async signUp(req: Request, res: Response) {
    const data = Object.assign(req.body, { status: 1 });
    try {
      const result = await new AuthRepository().register(data);
      res.json(result);
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }
}
