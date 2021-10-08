import { Router } from 'express';
import { UserController } from '@controller/index';
import { AuthMiddleware, CheckRoleAdmin } from '@middleware/AuthMiddleware';

const controller = new UserController();
const router = Router();

router.all('*', [AuthMiddleware, CheckRoleAdmin]);
router.get('/', controller.all);
router.get('/:id', controller.detail);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.remove);

export default router;
