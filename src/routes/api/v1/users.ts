import { Router } from 'express';
import { UserController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';

const controller = new UserController();
const router = Router();

router.all('*', AuthMiddleware);
router.get('/online', controller.listUserOnline);
router.get('/profile', controller.me);
router.put('/profile', controller.updateMe);

export default router;
