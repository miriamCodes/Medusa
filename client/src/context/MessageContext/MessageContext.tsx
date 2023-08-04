import { createContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
import { useContext } from "react";
import { Message, MessageContextValues } from "./MessageContextTypes";
import { ChatList } from "../ChatContext/ChatContextTypes";
import { ChatRoom } from "@/components/RoomList";

const MessageContext = createContext<MessageContextValues>({} as MessageContextValues);

function MessageProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const { socket, setRoom, roomLists, setRoomLists } = useContext(ChatContext);

  // DEFINITIONS

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  // MESSAGE FUNCTIONALITY

  function handleRoomButtonClick(roomName: string) {
    const existingRoom = roomLists.some((list) =>
      list.rooms.some((r) => r.name === roomName)
    );
    if (existingRoom) {
      console.log("You are already in this room.");
      return;
    }
  
    setRoom(roomName);
    const roomData = {
      name: roomName,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      creator: socket.id,
    };

    
    console.log("Room Data from RoomList:", roomData);
    socket.emit("join_room", roomData);

    let updatedRoomLists = [...roomLists]; // clone the current state
    const index = updatedRoomLists.findIndex((list) => list.socketId === socket.id);
    
    if (index !== -1) { // Ensure the item was found
      const updatedRooms = [
        ...updatedRoomLists[index].rooms,
        { name: roomName, time: roomData.time },
      ];
      const updatedList = {
        socketId: socket.id,
        rooms: updatedRooms,
      };
      
      updatedRoomLists[index] = updatedList;
    
      console.log("Updated Rooms RoomList:", updatedRooms);
    }
  
    // Update roomLists directly with the new value
    setRoomLists(updatedRoomLists)

  }
  

  const sendMessage = async (room: string) => {
    if (room !== "") {
      const messageData = {
        user: socket.id,
        room: room,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        sender: "me",
        socketId: socket.id,
      };
      if (message !== "") {
        await socket.emit("send_message", messageData);
        console.log('message sent:', messageData);
        setMessageList((list) => [...list, messageData]);
        setMessage("");
      }
    }
  };

  // USE EFFECTS
  // RECEIVE MESSAGE & JOIN EMPTY ROOM

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log('message received', data);
      const messageData = {
        ...data,
        sender: data.user === socket.id ? "me" : "other",
      };
      setMessageList((list) => [...list, messageData]);
      console.log('messageList', messageList);
    });

    socket.on('joined_empty_room', (data) => {
      console.log('joined_empty_room:', socket.id);
      const messageData = {
        user: socket.id,
        room: data.room,
        message: "Congrats, you are the first user that came up with this brilliant topic. Feel free, to wait for others to join you and in the meantime, maybe inspire yourself with what your friends talk about. ",
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        sender: "me",
        socketId: socket.id,
      };
      setMessageList((list) => [...list, messageData]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("joined_empty_room");
    };
   
  }, [socket]);

  // TEST LOGS

  // useEffect(() => {
  //   console.log('messageList:', messageList);
  // }, [messageList]);
  
  const value: MessageContextValues = {
    message,
    setMessage,
    messageList,
    setMessageList,
    sendMessage,
    handleRoomButtonClick
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContext, MessageProvider };
