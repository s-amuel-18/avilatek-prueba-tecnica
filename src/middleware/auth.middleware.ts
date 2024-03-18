import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../services/jwt.service';
import { NotFoundException, UnauthorizedException } from '../utils/error-exeptions.util';
import { userService } from '../services/user.service';

interface AuthMiddlewareParams {
  allowedRoles?: number[];
}

const unauthorizedDefaultMsg = 'Acceso denegado.';

export const auth =
  (authMiddlewareParams?: AuthMiddlewareParams) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { allowedRoles = null } = authMiddlewareParams || {};

    try {
      const bearerToken = jwtService.extractBearerToken(req.headers.authorization);
      if (!bearerToken) throw new UnauthorizedException(unauthorizedDefaultMsg);

      const { userId } = jwtService.verifyToken(bearerToken);
      const user = await userService.findById(userId);

      if (!user) throw new NotFoundException('El usuario no se encuentra registrado.');

      req.backpack.authUser = user;

      if (allowedRoles) {
        const hasRole = allowedRoles.includes(user.roleId);
        if (!hasRole) throw new UnauthorizedException(unauthorizedDefaultMsg);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
