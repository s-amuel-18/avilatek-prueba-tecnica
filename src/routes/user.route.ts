import { NextFunction, Request, Response, Router } from "express";
const router = Router();

router.get("/", (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: "hola",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
