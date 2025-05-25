import IChatmessageRepository from "../repository/chatmessagerepository.interface";
import INotificationRepository from "../repository/notificationrepository.interface";
import ISocketUseCase from "../usecase/socketusecase.interface";

 export default interface ISocketUsecaseDependencies {
  Repositories: {
    ChatRepository: IChatmessageRepository;
    NotificationRepository:INotificationRepository;
  };
}

export interface ISocketControllerDependencies{
    SocketUseCase: ISocketUseCase;
}