import { Request, Response, NextFunction } from 'express';
import { Chatroom } from '../models/chatroom';

export const createChatroom = async (req: Request, res: Response, next: NextFunction) => { 
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid name for the chatroom.' });
  }
  try {
        const chatroom = new Chatroom({ name });
        await chatroom.save();
        res.status(200).json(chatroom);
    } catch (err) {
        next(err);
    }
};

export const getChatrooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chatrooms = await Chatroom.find({});
        res.json(chatrooms);
    } catch (err) {
        next(err);
    }
};
