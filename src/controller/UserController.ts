import { Request, Response } from "express";
import UserRepository from "../app/Repositories/UserRepository";

class UserController {
  async all(request: Request, response: Response) {
    const result = await new UserRepository().getAll();
    response.json(result);
  }

  async one(request: Request, response: Response) {
    const result = await new UserRepository().getById(request.params.id);
    response.json(result);
  }

  async save(request: Request, response: Response) {
    const result = await new UserRepository().create(request.body);
    response.json(result);
  }

  async remove(request: Request, response: Response) {
    const result = await new UserRepository().deleteById(request.params.id);
    response.json(result);
  }
}
export default UserController;
