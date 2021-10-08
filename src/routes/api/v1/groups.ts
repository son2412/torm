import { Router } from 'express';
import { GroupController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';

const controller = new GroupController();
const router = Router();

router.all('*', AuthMiddleware);
router.get('/', controller.index);
router.post('/list', controller.list);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
