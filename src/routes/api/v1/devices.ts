import { DeviceController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';
import { Router } from 'express';

const controller = new DeviceController();
const router = Router();

router.all('*', AuthMiddleware);
router.post('/', controller.create);
router.delete('/:id', controller.deleteDevice);

export default router;
