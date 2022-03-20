import React, { useRef } from "react";
//import "./style.css";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = io("http://localhost:4000");
  const messageContainer = useRef(null);
  const messageInput = useRef(null);
  const roomInput = useRef(null);

  function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    messageContainer.current.append(div);
  }

  socket.on("connect", () => {
    displayMessage(`You connected with id -> ${socket.id}`);
  });

  socket.on("receive-message", (message) => displayMessage(message));

  function sendMessage() {
    if (messageInput.current.value === "") return;
    displayMessage(messageInput.current.value);
    socket.emit(
      "send-message",
      messageInput.current.value,
      roomInput.current.value
    );
    messageInput.current.value = "";
  }

  function joinRoom() {
    socket.emit("join-room", roomInput.current.value, (message) => {
      displayMessage(message);
    });
  }

  return (
    <div>
      <div id="message-container" ref={messageContainer}></div>
      <div>
        Message <input type="text" id="message-input" ref={messageInput} />
        <button
          type="submit"
          id="send-message-button"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
      <div>
        Room <input type="text" id="room-input" ref={roomInput} />
        <button type="submit" id="join-room-button" onClick={() => joinRoom()}>
          Join
        </button>
      </div>
    </div>
  );
}
