import { Router } from 'express';
import { TopicController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';

const controller = new TopicController();
const router = Router();

router.all('*', AuthMiddleware);
router.get('/', controller.index);
router.post('/', controller.store);

export default router;
