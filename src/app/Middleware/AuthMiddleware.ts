import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Exception } from '@service/Exception';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    throw new Exception('Token not found');
  }

  verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      throw new Exception('Token invalid!');
    }
    const memberID = Number(decode.data.id);
    req.user_id = memberID;
    next();
  });
}
