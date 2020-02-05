import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    throw new Error('Token not found');
  }

  verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      throw new Error('Token invalid!');
    }
    const memberID = Number(decode.data.id);
    req.user_id = memberID;
    next();
  });
}
