import { Router } from 'express';
import { AuthController } from '@controller/index';

const controller = new AuthController();
const router = Router();

router.post('/login', controller.signIn);
router.post('/register', controller.signUp);
router.post('/signin-facebook', controller.signInWithFacebook);
router.post('/signin-google', controller.signInWithGoogle);

export default router;
