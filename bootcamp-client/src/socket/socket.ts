import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 50,
});

socket.emit("jack", {
  room: "test",
  name: "test",
});

export default socket;
