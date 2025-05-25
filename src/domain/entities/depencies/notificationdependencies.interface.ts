import INotificationRepository from "../repository/notificationrepository.interface";
import INotificationUseCase from "../usecase/notificationusecase.interface";

export default interface INotificationUsecaseDependencies {
  Repositories: {
    NotificationRepository: INotificationRepository;
  };
}

export interface INotificationControllerDependencies{
    NotificationUseCase: INotificationUseCase;
}