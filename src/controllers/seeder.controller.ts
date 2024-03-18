import { NextFunction, Request, Response } from 'express';
import { seederService } from '../services/seeder.service';

export class SeederController {
  async execute(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      await seederService.execute();

      res.json({
        message: 'Seeders ejecutados',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const seederController = new SeederController();
