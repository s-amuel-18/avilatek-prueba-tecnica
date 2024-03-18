import jwt from "jsonwebtoken";
import { environment } from "../config/environment.config";
import { JwtCustomPayload } from "../interfaces/jwt.interface";

export class JwtService {
  static generateToken = (payload: JwtCustomPayload): string => {
    return jwt.sign(payload, environment.JWT_SECRET);
  };

  static verifyToken = (token: string): any => {
    return jwt.verify(token, environment.JWT_SECRET);
  };
}
