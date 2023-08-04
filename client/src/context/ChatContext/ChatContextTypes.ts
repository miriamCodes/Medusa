// import { createContext, useEffect, useState, ReactNode } from "react";
import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

const ChatContext = createContext<ChatContextValues>({} as ChatContextValues);

const socket = io('http://localhost:3001');

export type ChatRoom = {
  _id?: string;
  name: string;
  time: string;
}

export interface ChatContextValues {
  room: string;
  setRoom: (room: string) => void;
  chatrooms: ChatRoom[];
  setChatrooms: (chatrooms: ChatRoom[]) => void;
  socket: Socket;
  userCount: number;
  setUserCount: (count: number) => void;
  joinRoom: () => void;
  leaveRoom: (room: string) => void;
  roomLists: ChatList[];
  setRoomLists: (roomLists: ChatList[]) => void;
  positions: { top: number; left: number }[];
  setPositions: (positions: { top: number; left: number }[]) => void;
  setSelectorClosed: (closed: boolean) => void;
  setSelectorVisible: (visible: boolean) => void;
  isSelectorClosed: boolean;
  isSelectorVisible: boolean;
  colors: string[];
  bgColor: string;
  setBgColor: (color: string) => void;
  handleBackgroundColor: () => void;
}

export interface RoomList {
  socketId: string;
  rooms: ChatRoom[];
}
export interface ChatList {
  socketId: string;
  rooms: ChatRoom[];
}

export { ChatContext, socket };
