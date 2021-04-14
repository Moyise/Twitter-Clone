import io from "socket.io-client";

const ENDPOINT = "localhost:5000";

export const socket = io(ENDPOINT, { transports: ["websocket"] });

export const emitNotification = (userId: string, loggedInUserId: string) => {
  if (userId === loggedInUserId) return;

  socket.emit("notification received", userId);
};
