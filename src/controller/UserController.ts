import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

class UserController {
  async all(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();
    response.json(users);
  }

  async one(request: Request, response: Response) {
    const userRepository = getRepository(User);
    return userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response) {
    const userRepository = getRepository(User);
    return userRepository.save(request.body);
  }

  async remove(request: Request, response: Response) {
    const userRepository = getRepository(User);
    let userToRemove = await userRepository.findOne(request.params.id);
    await userRepository.remove(userToRemove);
  }
}
export default UserController;
