import { Router, Request, Response, NextFunction } from 'express';
import { Chatroom } from '../models/chatroom';

const router: Router = Router();
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Create new chatroom in database
        const { name } = req.body;
        const chatroom = new Chatroom({ name });
        await chatroom.save();
        res.json(chatroom);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve list of chatrooms from database
        const chatrooms = await Chatroom.find({});
        res.json(chatrooms);
    } catch (err) {
        next(err);
    }
});

export default router;