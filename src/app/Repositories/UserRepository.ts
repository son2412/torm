import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export default class UserRepository {
  async getAll() {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ relations: ["roles", "images"] });
    return users;
  }

  async getById(id) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    return user;
  }

  async create(data) {
    const userRepository = getRepository(User);
    const user = await userRepository.save(data);
    return user;
  }

  async deleteById(id) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    await userRepository.remove(user);
    return true;
  }
}
