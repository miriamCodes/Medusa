import "./App.css";
import Marquee from "react-fast-marquee";
import React, { useContext } from "react";
import RoomList from "./components/RoomList";
import RoomSelector from "./components/RoomSelector";
import ChatList from "./components/ChatList";
import { ChatContext } from "./context/ChatContext/ChatContext";

function App (): React.JSX.Element {
  const { bgColor } = useContext(ChatContext);

  return (
    <>
      <div className="App" style={{ backgroundColor: bgColor }}>
        <div className="room-list-container">
          <div
            className="RoomListMarquee"
            style={{ background: "rgb(182,182,182)", color: "rgb(15,11,39)" }}
          >
            <Marquee pauseOnHover speed={50}>
              <RoomList />
            </Marquee>
            <Marquee pauseOnHover speed={25}>
              <RoomList />
            </Marquee>
          </div>
        </div>
        <RoomSelector />
      </div>
      <ChatList />
    </>
  );
}

export default App;
