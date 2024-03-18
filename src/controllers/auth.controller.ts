import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const { token, user } = await authService.login(body);

      res.json({
        token,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const user = await authService.signUp(body);

      res.json({
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
