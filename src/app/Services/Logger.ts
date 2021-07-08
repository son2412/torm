import { Request, Response, NextFunction } from 'express';
import { log } from '../config/logger';

const logger = log('Request');

export default function RequestLogger(req: Request, res: Response, next: NextFunction) {
  const { method, body, query, params, originalUrl, headers } = req;
  logger.info(
    `Method: ${method} | FullPath: ${originalUrl} | Body: ${JSON.stringify(body)} | Query: ${JSON.stringify(
      query
    )} | Param: ${JSON.stringify(params)} | IP: ${headers['x-forwarded-for']}`
  );
  next();
}
