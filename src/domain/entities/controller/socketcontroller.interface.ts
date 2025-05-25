import { Socket } from "socket.io";
import INotification from "../model/notification.interface";


export default interface ISocketController {
  onConnection(socket: Socket): void;
  emitToAdmins(event: string, data: INotification): void;
}
