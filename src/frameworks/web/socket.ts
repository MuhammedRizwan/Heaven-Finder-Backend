import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import SocketController from "../../adapters/controllers/socket.controller";
import SocketDependencies from "../dependancies/socket.dependencies";

const Ioconfig = (server: HttpServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const socketController = new SocketController(io,SocketDependencies);

  io.on("connection", (socket) => {
    socketController.onConnection(socket);
  });

  return io;
};

export default Ioconfig;
