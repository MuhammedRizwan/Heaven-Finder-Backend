export default interface INotification {
  _id?: string;
  isRead: boolean;
  url: string;
  from: string;
  fromModel: "User" | "Agent" | "Admin";
  to: string;
  toModel: "User" | "Agent" | "Admin";
  message: string;
  createdAt: Date;
}



