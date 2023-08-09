import './Messaging.css';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  MouseEvent,
} from 'react';
import { MessageContext } from '../context/MessageContext/MessageContext';
import { ChatContext } from '../context/ChatContext/ChatContext';

function Chat({
  room,
  socket,
}: {
  room: string;
  socket: any;
}): React.JSX.Element {
  const { setMessage, messageList, sendMessage } = useContext(MessageContext);
  const { leaveRoom, handleBackgroundColor } = useContext(ChatContext);

  // MESSAGE FUNCTIONALITY

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    sendMessage(room);
    const targetNode = e.target as Node;
    if (targetNode.parentNode) {
      const input = (targetNode.parentNode as HTMLElement).querySelector(
        'input'
      );
      if (input) {
        input.value = '';
      }
    }
  };

  const handleLeaveRoom = (): void => {
    handleBackgroundColor();
    leaveRoom(room);
  };

  // COLORS
  const colorMapRef = useRef<Record<string, string>>({});
  const [colorMap, setColorMap] = useState({});
  const [color] = useState(
    `#${((Math.random() * 0xffffff) << 0).toString(16)}`
  );
  // if the color is supposed to be changed at a later state, include 'setColor' as a second state

  useEffect(() => {
    const newColorMap = {
      ...colorMap,
      [socket.id]: color,
    };
    colorMapRef.current = newColorMap;
    setColorMap(newColorMap);
  }, [socket.id, color]);

  function getColor(sender: string): string {
    if (!colorMapRef.current[sender]) {
      // Generate a random color for new users
      const newColor = getRandomColor();
      const newColorMap = {
        ...colorMapRef.current,
        [sender]: newColor,
      };
      colorMapRef.current = newColorMap;
      setColorMap(newColorMap);
    }
    return colorMapRef.current[sender];
  }

  function getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // POSITIONING

  function calculateLeft(): string {
    const value: string = `${Math.floor(
      Math.random() * (window.innerWidth - 300)
    )}px`;
    console.log('VALEU', value);
    return value;
  }

  function calculateTop(): string {
    return `${Math.floor(Math.random() * (window.innerHeight - 300))}px`;
  }

  const [position, setPosition] = useState({ top: '-1000px', left: '-1000px' });

  useEffect(() => {
    setPosition({ top: calculateTop(), left: calculateLeft() });
  }, []);

  // MOUSE DRAG AND DROP

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  function handleMouseDown(event: MouseEvent): void {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - parseInt(position.left),
      y: event.clientY - parseInt(position.top),
    });
  }

  function handleMouseMove(event: MouseEvent): void {
    if (isDragging) {
      setPosition({
        left: `${event.clientX - dragOffset.x}px`,
        top: `${event.clientY - dragOffset.y}px`,
      });
    }
  }

  function handleMouseUp(): void {
    setIsDragging(false);
  }
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div
      className="MessageContainer"
      style={{ position: 'absolute', ...position }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="ChatBar">
        <div className="Room">{room}</div>
        <button
          className="LeaveButton"
          aria-label="leave chatroom button"
          onClick={handleLeaveRoom}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
      </div>

      <div className="ChatWindow">
        <div className="MessageWrapper">
          {messageList
            .filter((messageContent) => messageContent.room === room)
            .map((messageContent) => (
              <div
                key="messageContent.sender"
                className={`Message ${messageContent.sender}`}
              >
                <div
                  className="User_Time"
                  style={{ color: getColor(messageContent.socketId) }}
                >
                  {messageContent.sender === 'me'
                    ? 'You'
                    : `User ${messageContent.socketId.substring(0, 5)}`}
                  ,{messageContent.time}
                </div>
                <div className="MessageContent">{messageContent.message}</div>
                <div ref={messagesEndRef} />
              </div>
            ))}
        </div>

        <div className="ChatInputWrapper">
          <div className="ChatInput">
            <input
              className="MessageInput"
              aria-label="form element to write message"
              type="text"
              onChange={(event): void => {
                setMessage(event.target.value);
              }}
            />
            <button
              className="SendButton"
              aria-label="send button to send message"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
