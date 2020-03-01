import { Request, Response } from "express";
import { UserRepository } from "@repository/index";
import { ApiRespone } from "@service/ApiRespone";

export class UserController {
  async all(req: Request, res: Response) {
    try {
      const result = await new UserRepository().getAll();
      res.json(ApiRespone.collection(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }
}
