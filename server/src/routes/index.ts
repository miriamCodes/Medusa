import { Router } from 'express';
import chatrooms from './chatrooms';

const router: Router = Router();
router.use('/chatrooms', chatrooms);

export default router;