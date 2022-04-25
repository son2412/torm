import { Router } from 'express';
import { AuthController } from '@controller/index';
import { changeLanguage } from '@middleware/AuthMiddleware';

const controller = new AuthController();
const router = Router();

router.all('*', changeLanguage)
router.post('/login', controller.signIn);
router.post('/register', controller.signUp);
router.post('/signin-facebook', controller.signInWithFacebook);
router.post('/signin-google', controller.signInWithGoogle);
router.post('/signin-twitter', controller.signInWithTwitter);

export default router;
