import { Router } from 'express';

import user from './users';

const routes = Router();

routes.use('/users', user);

export default routes;
