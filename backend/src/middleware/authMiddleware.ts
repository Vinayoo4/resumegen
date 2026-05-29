import { Request, Response, NextFunction } from 'express';
import { parseToken } from '../auth/auth';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const userId = parseToken(token);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // @ts-ignore
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
