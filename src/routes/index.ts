import { Router } from 'express';
import ApiRouter from './api';

const routes = Router();

routes.use('/api', ApiRouter);

export default routes;
