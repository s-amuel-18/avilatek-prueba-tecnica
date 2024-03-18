import express from 'express';
import { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { initRoutes } from './routes/index.route';
import { CError } from './interfaces/error.interface';
import { RequestBackpack } from './interfaces/express.interface';
import { environment } from './config/environment.config';
import { HttpStatus } from './utils/http-status.util';
import { jwtService } from './services/jwt.service';

const app = express();

declare global {
  namespace Express {
    interface Request {
      backpack: RequestBackpack;
    }
  }
}

// ** Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ** HTTP Methods Allowed
app.use((req, res, next) => {
  try {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    });

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      throw new Error('Method not allowed');
    }

    return next();
  } catch (error) {
    return next(error);
  }
});

// ** Response interceptor
app.use((req: Request, res, next) => {
  try {
    req.backpack = {
      token: null,
    };

    let token = null;

    try {
      token = jwtService.regenerateToken(req.headers.authorization);
    } catch (error) {}

    const oldJson = res.json;

    const response = {
      token,
      message: '',
      data: {},
      errors: [],
    };

    res.json = function (data: any) {
      if (data.message) response.message = data.message;
      if (data.data) response.data = data.data;
      if (data.errors) response.errors = Array.isArray(data.errors) ? data.errors : [data.errors];
      if (data.token) response.token = data.token;

      res.json = oldJson;

      return res.json(response);
    };
    return next();
  } catch (error) {
    return next(error);
  }
});

// ** Routes
initRoutes(app);

// * URL Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(404).json({ message: 'URL NOT FOUND' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// ** Server internal error handler
app.use((error: any | Error, req: Request, res: Response, next: NextFunction): Response => {
  if (error instanceof Error)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Servicio no disponible en este momento',
      errors:
        environment.APP_ENVIRONMENT === 'production'
          ? null
          : {
              message: error.message,
              endpoint: req.originalUrl,
              method: req.method,
              stack: error.stack,
            },
    });

  return res.status(error.status).json({
    message: error.message || `Servicio no disponible en este momento`,
    ...(!!error.errors ? { errors: error.errors } : { errors: [] }),
  });
});

export default app;
