import { Router } from 'express';
import admin from './admin';
import upload from './upload';
import auth from './auth';
import user from './users';

const routes = Router();

routes.use('/admin', admin);
routes.use('/upload', upload);
routes.use('/auth', auth);
routes.use('/users', user);

export default routes;
