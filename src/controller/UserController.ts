import { Request, Response } from "express";
import { UserRepository } from "@repository/index";
import { Auth } from "../app/Services/Auth";

export class UserController {
  async all(request: Request, response: Response) {
    const result = await new UserRepository().getAll();
    response.json(result);
  }
}
