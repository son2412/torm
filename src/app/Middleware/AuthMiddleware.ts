import { TokenInvalid, TokenNotFound } from '@const/error';
import { App } from '@provider/App';
import { UserRepository } from '@repository/UserRepository';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization || '';
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

export async function CheckRoleAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  const user = await App.make(UserRepository).show(id);
  if (!user) return res.status(401).json({ message: 'Unauthorized!', success: false, errorText: 'Unauthorized' });
  const findRoleAdmin = user.roles.find((role) => role.slug === 'admin');
  if (!user.roles.length || !findRoleAdmin) {
    return res.status(403).json({ message: 'Permission Denied!', success: false, errorText: 'PermissionDenied' });
  }
  next();
}

export async function CheckRoleUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  const user = await App.make(UserRepository).show(id);
  if (!user) return res.status(401).json({ message: 'Unauthorized!', success: false, errorText: 'Unauthorized' });
  const findRoleUser = user.roles.find((role) => role.slug === 'user');
  if (!user.roles.length || !findRoleUser) {
    return res.status(403).json({ message: 'Permission Denied!', success: false, errorText: 'PermissionDenied' });
  }
  next();
}

export const decodeToken = (token) => {
  let err, decodeData;
  try {
    decodeData = verify(token, process.env.JWT_SECRET);
  } catch (error) {
    err = { message: 'Token not found !', success: false };
  }

  return [err, decodeData];
};
