import './ChatList.css';
import React, { useContext } from 'react';
import Chat from './Messaging';
import { ChatContext } from '../context/ChatContext/ChatContext';

function ChatList(): JSX.Element {
  const { roomLists, socket } = useContext(ChatContext);

  const index = roomLists.findIndex((list) => list.socketId === socket.id);

  if (index === -1) {
    return <></>;
  }

  return (
    <div>
      {roomLists[index].rooms.map((room) => (
        <div
          className="ChatList"
          key={room.name}
        >
          <Chat room={room.name} socket={socket} />
        </div>
      ))}
    </div>
  );
}

export default ChatList;
