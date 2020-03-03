import { Router } from 'express';
import admin from './admin';
import upload from './upload';
import auth from './auth';

const routes = Router();

routes.use('/admin', admin);
routes.use('/upload', upload);
routes.use('/auth', auth);

export default routes;
