import './RoomList.css';
import { useContext } from 'react';
import { ChatRoom } from '@/context/ChatContext/ChatContextTypes';
import { ChatContext } from '../context/ChatContext/ChatContext';
import { MessageContext } from '../context/MessageContext/MessageContext';

function RoomList(): JSX.Element {
  const {
    chatrooms,
    setSelectorClosed,
    setSelectorVisible,
    colors,
    setBgColor,
    bgColor,
    handleBackgroundColor,
  } = useContext(ChatContext);
  const { handleRoomButtonClick } = useContext(MessageContext);

  const handleButtonClick = (roomName: string) => {
    handleRoomButtonClick(roomName);
    toggleSelector();
    handleBackgroundColor();
    console.log('I was executed handleBf');
  };

  const toggleSelector = () => {
    setSelectorVisible(false);
    setSelectorClosed(true);
  };

  return (
    <div className="RoomList">
      <div>
        {chatrooms.map((chatroom: ChatRoom) => {
          const roomName = chatroom.name;
          return (
            <button
              className="RoomButton"
              key={chatroom._id}
              onClick={() => handleButtonClick(roomName)}
            >
              {chatroom.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RoomList;
