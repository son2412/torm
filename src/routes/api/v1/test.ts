import { Router } from 'express';

const router = Router();

router.post('/', test);

async function test(req: Request, res: Response) {}

export default router;
