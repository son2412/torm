import { Router } from 'express';
import { UserController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';

const controller = new UserController();
const router = Router();

router.all('*', AuthMiddleware);
router.get('/profile', controller.me);
router.put('/profile', controller.updateProfile);

export default router;
