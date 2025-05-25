import INotification from "../../../domain/entities/model/notification.interface";

export default interface INotificationUseCase {
  getAgentNotifications(agentId: string): Promise< INotification[] | null> ;
  getUserNotifications(userId: string): Promise< INotification[] | null> ;
  getAdminNotifications(adminId: string): Promise< INotification[] | null> ;
}
