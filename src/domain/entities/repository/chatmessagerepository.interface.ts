import IChat, { IMessage } from "../model/chat.interface";

  export default interface IChatmessageRepository {
    saveMessage(
      roomId: string,
      senderId: string,
      message: string,
      message_time:Date,
      message_type: string,
    ): Promise<IMessage>;
    getMessagesByRoom(roomId: string): Promise<IChat>;
    getRoom(recieverId: string, senderId: string): Promise<IChat | null>;
    createRoom(recieverId: string, senderId: string): Promise<IChat>;
    getRoomById(roomId: string,userId:string): Promise<IChat | null>;
    getChats(query: object, userId: string | undefined): Promise<IChat[] | null>;
    getUnreadMessageCount(
      chatId: string,
      userId: string | undefined
    ): Promise<number>;
  }