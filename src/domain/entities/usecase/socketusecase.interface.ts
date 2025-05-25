import INotification from "../../../domain/entities/model/notification.interface";
import { IMessage } from "../model/chat.interface";

export default interface ISocketUseCase {
  saveMessage(
    roomId: string,
    senderId: string,
    message: string,
    message_time: Date,
    message_type: string
  ): Promise<IMessage>;

  saveAdminNotification(data: INotification): Promise<INotification>;

  saveNotification(data: INotification): Promise<INotification>;
}
