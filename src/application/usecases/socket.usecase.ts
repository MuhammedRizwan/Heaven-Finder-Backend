import configKeys from "../../domain/config/dotenv.config";
import ISocketUsecaseDependencies from "../../domain/entities/depencies/socketdependencies.interface";
import { IMessage } from "../../domain/entities/model/chat.interface";
import INotification from "../../domain/entities/model/notification.interface";
import IChatmessageRepository from "../../domain/entities/repository/chatmessagerepository.interface";
import INotificationRepository from "../../domain/entities/repository/notificationrepository.interface";
import ISocketUseCase from "../../domain/entities/usecase/socketusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";

export default class SocketUseCase implements ISocketUseCase{
  private _chatRepository: IChatmessageRepository;
  private _notificationRepository: INotificationRepository;
  constructor(dependencies: ISocketUsecaseDependencies) {
    this._chatRepository = dependencies.Repositories.ChatRepository;
    this._notificationRepository = dependencies.Repositories.NotificationRepository;
  }
  async saveMessage(
    roomId: string,
    senderId: string,
    message: string,
    message_time: Date,
    message_type: string
  ):Promise<IMessage> {
    try {
      const savedMessage = await this._chatRepository.saveMessage(
        roomId,
        senderId,
        message,
        message_time,
        message_type
      );
      if (!savedMessage) {
        throw new CustomError("message not saved", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return savedMessage;
    } catch (error) {
      throw error;
    }
  }
  async saveAdminNotification(data:INotification):Promise<INotification>{
    try {
      data.to = configKeys.ADMIN_ID
      data.toModel="Admin"
      const savedNotification = await this._notificationRepository.saveNotification(data);
      if(!savedNotification){
        throw new CustomError("INotification not saved",HttpStatusCode.INTERNAL_SERVER_ERROR)
      }
      return savedNotification
    } catch (error) {
      throw error
    }
  }
  async saveNotification(data:INotification):Promise<INotification>{
    try {
      const savedNotification = await this._notificationRepository.saveNotification(data);
      if(!savedNotification){
        throw new CustomError("INotification not saved",HttpStatusCode.INTERNAL_SERVER_ERROR)
      }
      return savedNotification
    } catch (error) {
      throw error
    }
  }
}
