import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { version } from "../package.json";
import { initRoutes } from "./routes/index.route";
import { CError } from "./interfaces/error.interface";
import { RequestBackpack } from "./interfaces/express.interface";

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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    });

    if (req.method === "OPTIONS") {
      res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      throw new Error("Method not allowed");
    }

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// ** Response interceptor
app.use((req: Request, res, next) => {
  try {
    req.backpack = {
      token: null,
    };

    const oldJson = res.json;

    const response = {
      version,
      token: "",
      message: "",
      data: {},
      errors: [],
    };

    res.json = function (data) {
      let status = 200;

      if (data.message) {
        response.message = data.message;
      }

      if (data.data) {
        response.data = data.data;
      }

      if (data.errors) {
        response.errors = Array.isArray(data.errors)
          ? data.errors
          : [data.errors];
      }

      res.json = oldJson;

      if (status && status !== 200) {
        return res.status(status).json(response);
      }

      return res.json(response);
    };
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// ** Routes
initRoutes(app);

// * URL Not Found
app.use((req, res, next: NextFunction) => {
  try {
    return res.status(404).json({ message: "URL NOT FOUND" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// ** Server internal error handler
app.use(
  (
    error: CError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof Error)
      return res.status(500).json({
        message: "Servicio no disponible en este momento",
        errors:
          process.env.ATLETAS_NODE_ENV === "production"
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
      ...(!!error.errors ? { errors: error.errors } : {}),
    });
  }
);

export default app;
