import { io } from "socket.io-client";
const socket = io("ws://localhost:5000", {
  path: "/messages",
  transport: "websocket",
});
socket.onAny((event, args) => {
  console.log(event);
});
export default socket;
