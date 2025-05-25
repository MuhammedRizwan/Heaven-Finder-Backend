import INotificationUsecaseDependencies from "../../domain/entities/depencies/notificationdependencies.interface";
import INotification from "../../domain/entities/model/notification.interface";
import INotificationRepository from "../../domain/entities/repository/notificationrepository.interface";
import INotificationUseCase from "../../domain/entities/usecase/notificationusecase.interface";


export default class NotificationUseCase implements INotificationUseCase {
  private _NotificationRepository: INotificationRepository;
  constructor(dependencies: INotificationUsecaseDependencies) {
    this._NotificationRepository = dependencies.Repositories.NotificationRepository;
  }
  async getAgentNotifications(agentId: string): Promise<INotification[] | null> {
    try {
      const notifications = await this._NotificationRepository.getAgentNotifications(
        agentId
      );
      return notifications;
    } catch (error) {
      throw error
    }
  }
  async getUserNotifications(userId: string): Promise<INotification[] | null> {
    try {
      const notifications = await this._NotificationRepository.getUserNotifications(
        userId
      );
      return notifications;
    } catch (error) {
      throw error
    }
  }
  async getAdminNotifications(adminId: string): Promise<INotification[] | null> {
    try {
      const notifications = await this._NotificationRepository.getAdminNotifications(
        adminId
      );
      return notifications;
    } catch (error) {
      throw error
    }
  }
}
