import mongoose, { Schema, Document } from 'mongoose';

export interface IChatroom extends Document {
    name: string;
    users: number;
    usernames: string[];
}

const chatroomSchema = new Schema<IChatroom>({
    name: String,
    users: { type: Number, default: 0 },
    usernames: { type: [String], default: [] }
});

export const Chatroom = mongoose.model<IChatroom>("Chatroom", chatroomSchema);
