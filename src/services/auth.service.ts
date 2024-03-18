import { LoginParams } from '../interfaces/services/auth-service.interface';
import { BadRequestException, NotFoundException } from '../utils/error-exeptions.util';
import { jwtService } from './jwt.service';
import { userService } from './user.service';
import { CreateUser } from '../interfaces/services/user-service.interface';

class AuthService {
  async login(LoginParams: LoginParams) {
    const user = await userService.findByEmail(LoginParams.email);
    if (!user) throw new NotFoundException('El usuario no se encuentra registrado.');

    const isValidPassword = user.verifyPassword(LoginParams.password);
    if (!isValidPassword) throw new BadRequestException('Contraseña invalida.');

    const token = jwtService.generateToken({ userId: user.id });
    const userJson = user.toJSON();
    delete userJson.password;

    return { token, user: userJson };
  }

  async signUp(createUser: CreateUser) {
    return await userService.create({ ...createUser, roleId: 1 });
  }
}

export const authService = new AuthService();
