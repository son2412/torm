import { Router } from 'express';
import { GroupController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';

const controller = new GroupController();
const router = Router();

router.all('*', AuthMiddleware);
router.get('/', controller.all);
router.get('/:id', controller.detail);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id/leave', controller.leave);
router.post('/chat-with', controller.createChatWith);
router.delete('/:id/delete', controller.deleteGroup);
router.post('/:id/add-user', controller.addUserToGroup);

export default router;
