import { TokenInvalid, TokenNotFound } from '@const/error';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json(TokenNotFound);
  }

  verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).json(TokenInvalid);
    }
    req.user_id = Number(decode.data.id);
    req.user = decode.data;
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
