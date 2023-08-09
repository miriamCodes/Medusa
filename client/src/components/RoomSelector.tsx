import './RoomSelector.css';
import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext/ChatContext';

function RoomSelector(): React.JSX.Element {
  const {
    setRoom,
    joinRoom,
    setSelectorVisible,
    setSelectorClosed,
    isSelectorClosed,
    isSelectorVisible,
    handleBackgroundColor,
  } = useContext(ChatContext);

  const handleJoinRoom = (): void => {
    setSelectorVisible(false);
    setSelectorClosed(true);
    handleBackgroundColor();
    joinRoom();
  };

  const handleToggleSelector = (): void => {
    setSelectorVisible(!isSelectorVisible);
    setSelectorClosed(false);
  };

  return (
    <>
      {isSelectorVisible && !isSelectorClosed && (
        <div className="RoomSelector">
          <div>
            Hello, again!
            <br />
            Is there anything specific, you feel like talking about today?
          </div>
          <div className="SelectorInputAndButton">
            <input
              className="SelectorInput"
              type="text"
              placeholder="e.g. Japanese Food, Barbie, ..."
              onChange={(event): void => {
                setRoom(event.target.value);
              }}
            />
            <button className="JoinButton" onClick={handleJoinRoom}>
              Join
            </button>
          </div>
          <div>Otherwise, feel free to inspire yourself among friends.</div>
        </div>
      )}
      {isSelectorClosed && (
        <div className="PlusButton">
          <button onClick={handleToggleSelector}>+</button>
        </div>
      )}
    </>
  );
}

export default RoomSelector;
