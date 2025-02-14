import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  payload?: any;
  user?: any;
}

export const authenticationMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({ status: 401, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const jwtResponse = jwt.verify(token, process.env.SECRET_KEY as string);
    req.payload = jwtResponse;
    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "Authentication failed...please login" });
  }
};