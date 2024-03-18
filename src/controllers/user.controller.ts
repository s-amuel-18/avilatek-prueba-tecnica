import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';

class UserController {
  // TODO: Solo provicional
  async userSeeder(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.seeder();

      res.json({
        data: {
          user: null,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
