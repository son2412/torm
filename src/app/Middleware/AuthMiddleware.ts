import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Exception } from '@service/Exception';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    res.status(401).json({ message: 'Token not found !', success: false });
    throw new Exception('Token not found');
  }

  verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      res.status(401).json({ message: 'Token invalid !', success: false });
      throw new Exception('Token invalid!');
    }
    req.user_id = Number(decode.data.id);
    next();
  });
}

export const decodeToken = (token) => {
  let err,
    decodeData = undefined;
  try {
    decodeData = verify(token, process.env.JWT_SECRET);
  } catch (error) {
    err = { message: 'Token not found !', success: false };
  }

  return [err, decodeData];
};
