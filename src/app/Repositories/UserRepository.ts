import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export default class UserRepository {
  userRepository: any;
  constructor() {
    this.userRepository = getRepository(User);
  }
  async getAll() {
    const users = await this.userRepository.find({ relations: ["roles", "images"] });
    return users;
  }

  async getById(id) {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async create(data) {
    const user = await this.userRepository.save(data);
    return user;
  }

  async deleteById(id) {
    const user = await this.userRepository.findOne(id);
    await this.userRepository.remove(user);
    return true;
  }
}
