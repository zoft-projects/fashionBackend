import { Request, Response, NextFunction } from 'express';
import users from '../../database/models/users/users';

export interface CustomRequest extends Request {
  payload?: any;
  user?: any;
}

export const identityMiddleware = (...roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.payload?.uid;
      if (!userId) {
        res.status(401).json({ status: 401, message: "Unauthorized access" });
        return;
      }

      const user = await users.findById(userId);
      if (!user) {
        res.status(401).json({ status: 401, message: "User not found" });
        return;
      }

      if (roles.length && !roles.includes(user.role)) {
        res.status(403).json({ status: 403, message: "Access Denied" });
        return;
      }

      req.user = user;
      next();
    } 
    catch (error: any) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Server error", error: error.message });
    }
  };
};
