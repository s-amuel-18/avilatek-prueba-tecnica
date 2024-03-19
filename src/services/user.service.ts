// import { User } from 'src/models/user.model';

import { FindOneOptions } from '../interfaces/service.interface';
import { CreateUser } from '../interfaces/services/user-service.interface';
import { adminRole, clientRole } from '../models/role.model';
import { User, excludedAttributes } from '../models/user.model';
import { BadRequestException, NotFoundException } from '../utils/error-exeptions.util';

class UserService {
  // * Create
  async create(userData: CreateUser) {
    await this.exceptionIfEmailExists(userData.email);

    const newUser = await User.create({
      roleId: userData.roleId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const userJson = newUser.toJSON();
    delete userJson.password;

    return userJson;
  }

  // * Find
  async findById(id: number) {
    return await User.findOne({ where: { id } });
  }

  async findByEmail(email: string, findOneOptions: FindOneOptions = {}) {
    const {
      exceptionIfNotFound = true,
      notFoundMsg = 'El correo electrónico no se encuentra registrado.',
      includeHiddenFields = false,
    } = findOneOptions;

    const user = await User.findOne({
      where: { email },
      attributes: { include: [...(includeHiddenFields ? excludedAttributes : [])] },
    });

    if (exceptionIfNotFound && !user) throw new NotFoundException(notFoundMsg);
    return user;
  }

  async getUserPassword(userId: number) {
    const user = await User.findOne({ where: { id: userId }, attributes: ['password'] });
    console.log({ user });
  }

  // * Seeders
  async seeder() {
    const newUser = await User.create({
      roleId: adminRole,
      name: 'Samuel Graterol',
      email: 'samuel@graterol.com',
      password: '11111111',
    });
  }

  // * Exceptions
  async exceptionIfEmailExists(email: string) {
    const user = await this.findByEmail(email, { exceptionIfNotFound: false });

    if (user) throw new BadRequestException('El correo electrónico ya se encuentra registrado.');
  }
}

export const userService = new UserService();
