import { Router } from 'express';
import admin from './admin';
import upload from './upload';
import auth from './auth';
import user from './users';
import group from './groups';
import message from './messages';
import topic from './topics';

const routes = Router();

routes.use('/admin', admin);
routes.use('/upload', upload);
routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/groups', group);
routes.use('/messages', message);
routes.use('/topics', topic);

export default routes;
