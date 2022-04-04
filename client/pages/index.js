import io from "socket.io-client";
import { useEffect, useState } from "react";
import Head from 'next/head';

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");
  const [displayRoom, setDisplayRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
      setDisplayRoom(room)
    }
  };

  const sendMessage = () => {
    socket.emit("sendMessage", { message, room });
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="flex items-center justify-center flex-col">

      <Head><title>Chat App - Home</title></Head>

      <div className="flex flex-col h-[30vh]">
      <div className="flex items-center justify-center">
        <span className="italic text-[1.15rem]"> <span className="underline">Joined Room</span> : {displayRoom===""?"'No Room Joined'":displayRoom}</span>
      </div>
      <div className="rounded-xl p-3 flex items-center justify-center bg-[rgb(40,40,40)] text-white">
        <input
          className="text-black border-2 border-white rounded-xl p-2 focus:border-blue-500"
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button className="mx-2 border-2 border-white rounded-xl p-2" onClick={joinRoom}> Join Room</button>
      </div>

        <div className="pt-6">
          <input
            className="border-2 border-black rounded-xl p-2 focus:border-blue-500"
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button className="mx-2 border-2 border-black rounded-xl p-2" onClick={sendMessage}> Send Message</button>
        </div>
      </div>

      <div className="h-[70vh] flex items-center justify-center">
        {messageReceived!==""&&
        <div className=" flex flex-col items-center justify-center py-3 px-16 rounded-xl cursor-pointer border-[0.05rem] border-black bg-[rgb(176,175,221)]">
            <span className="text-[0.85rem] italic">Message received</span>
            <span className="text-[1.5rem] font-semibold">{messageReceived}</span>
          </div>
        }
      </div>

    </div>
  );
}

export default App;