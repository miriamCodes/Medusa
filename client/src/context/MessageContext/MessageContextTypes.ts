import { Socket } from "socket.io-client";

export interface Message {
  // Define properties for a message (if needed???)
}

export interface MessageContextValues {
  message: string;
  setMessage: (message: string) => void;
  messageList: Message[];
  setMessageList: (messageList: Message[]) => void;
  sendMessage: (room: string) => void;
  handleRoomButtonClick: (roomName: string) => void;
}
