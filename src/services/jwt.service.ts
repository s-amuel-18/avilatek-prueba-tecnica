import jwt from 'jsonwebtoken';
import { environment } from '../config/environment.config';
import { JwtCustomPayload } from '../interfaces/jwt.interface';
import { UnauthorizedException } from '../utils/error-exeptions.util';

class JwtService {
  generateToken = (payload: JwtCustomPayload): string => {
    return jwt.sign(payload, environment.JWT_SECRET, { expiresIn: environment.JWT_EXPIRATION });
  };

  verifyToken = (token: string): any => {
    try {
      return jwt.verify(token, environment.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Acceso denegado.');
    }
  };

  extractBearerToken(authorization: string | undefined) {
    if (!authorization) return null;
    return authorization.split(' ')[0] === 'Bearer' ? authorization.split(' ')[1].trim() : null;
  }

  regenerateToken(authorization: string | undefined) {
    const currentToken = this.extractBearerToken(authorization);
    if (!currentToken) return null;

    const decodedToken = this.verifyToken(currentToken);
    if (decodedToken) return this.generateToken({ userId: decodedToken.userId });
  }
}

export const jwtService = new JwtService();
