import React, { useState } from "react";
import Messages from "./Messages";
import { useSelector } from "react-redux";

export default function Chat() {
  // const socket = io("http://localhost:4000");
  // const messageContainer = useRef(null);
  // const messageInput = useRef(null);
  // const roomInput = useRef(null);

  // function displayMessage(message) {
  //   const div = document.createElement("div");
  //   div.textContent = message;
  //   messageContainer.current.append(div);
  // }

  // socket.on("connect", () => {
  //   displayMessage(`You connected with id -> ${socket.id}`);
  // });

  // socket.on("receive-message", (message) => displayMessage(message));

  // function sendMessage() {
  //   if (messageInput.current.value === "") return;
  //   displayMessage(messageInput.current.value);
  //   socket.emit(
  //     "send-message",
  //     messageInput.current.value,
  //     roomInput.current.value
  //   );
  //   messageInput.current.value = "";
  // }

  // function joinRoom() {
  //   socket.emit("join-room", roomInput.current.value, (message) => {
  //     displayMessage(message);
  //   });
  // }

  const { socket } = useSelector((state) => state.PlayerStore);
  const { roomId } = useSelector((state) => state.GameStore);
  const [value, setValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("message", value, roomId);
    setValue("");
  };

  return (
    <>
      <div className="chat-container">
        <h1 className="chat-header">Chat</h1>
        <Messages />
        <form className="chat-box" onSubmit={submitForm}>
          <input
            className="message-input"
            autoFocus
            value={value}
            placeholder="Type your message"
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
        </form>
      </div>
    </>
  );
}
