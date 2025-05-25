import INotification from "../model/notification.interface";

export default interface INotificationRepository {
  saveNotification(data: INotification): Promise<INotification | null>;
  getAgentNotifications(id: string): Promise<INotification[] | null>;
  getUserNotifications(id: string): Promise<INotification[] | null>;
  getAdminNotifications(id: string): Promise<INotification[] | null>;
}