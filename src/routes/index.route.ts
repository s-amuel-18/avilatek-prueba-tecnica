'use strict';

import { Application } from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import seederRoutes from './seeder.route';
import productRoutes from './product.route';

export const initRoutes = (app: Application, baseUrl = '/api') => {
  try {
    app.use(`${baseUrl}/users`, userRoutes);
    app.use(`${baseUrl}/auth`, authRoutes);
    app.use(`${baseUrl}/seeders`, seederRoutes);
    app.use(`${baseUrl}/products`, productRoutes);

    app.get(`${baseUrl}`, (req, res) => {
      res.json({
        message: 'Avila Tek Rest API',
      });
    });
  } catch (error) {
    console.log('[EXPRESS-SERVER]: Error loading routes ❌');
  }
};
