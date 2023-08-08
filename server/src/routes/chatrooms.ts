import { Router } from 'express';
import * as chatroomController from '../controllers/chatroomController';

const router: Router = Router();
router.post('/', chatroomController.createChatroom);
router.get('/', chatroomController.getChatrooms);

export default router;
