// import { User } from 'src/models/user.model';

import { CreateUser } from '../interfaces/services/user-service.interface';
import { User } from '../models/user.model';

class UserService {
  // * Create
  async create(userData: CreateUser) {
    return await User.create({
      roleId: userData.roleId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  }

  // * Finders
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  // * Seeders
  async seeder() {
    const newUser = await User.create({
      roleId: 1,
      name: 'Samuel Graterol',
      email: 'samuel@graterol.com',
      password: '11111111',
    });
  }
}

export const userService = new UserService();
