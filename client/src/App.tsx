import "./App.css";
import Marquee from "react-fast-marquee";
import React, { useContext, useEffect } from "react";
import RoomList from "./components/RoomList";
import RoomSelector from "./components/RoomSelector";
import ChatList from "./components/ChatList";
import { ChatContext } from "./context/ChatContext/ChatContext";
import firebase from "./firebaseClient";
import { User } from "@firebase/auth-types";
import FirebaseFetch from "./components/FirebaseFetch";


function App(): React.JSX.Element {
  
  const { bgColor } = useContext(ChatContext);

  useEffect(() => {
    
    const unsubscribe = firebase.auth().onAuthStateChanged((user: User | null) => {
      if (user) {
        console.log('User signed in:', user.uid);
      } else {
        console.log('No user signed in. Attempting anonymous sign in...');
        firebase.auth().signInAnonymously().catch((error: Error) => {
          console.error('Error in anonymous sign in:', error);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <FirebaseFetch />
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
