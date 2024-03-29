import { Router } from 'express';
import { MessageController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';

const controller = new MessageController();
const router = Router();

router.all('*', AuthMiddleware);
router.post('/', controller.create);

export default router;
