import IUser  from "../../../domain/entities/model/user.interface";
import IChat from "../model/chat.interface";

export  default interface IChatmessageUseCase {
  getContacts(search: string, userId?: string): Promise<IUser[]>;
  getChats(search: string, userId?: string): Promise< {
    _id: string | undefined;
    chatId: string;
    username: string;
    profile_picture: string | null;
    lastMessage: string | null;
    unReadCount: number;
}[]>;
  getRoom(recieverId: string, senderId: string): Promise<IChat>; 
  getRoomMessage(roomId: string, userId: string): Promise<IChat>; 
}
