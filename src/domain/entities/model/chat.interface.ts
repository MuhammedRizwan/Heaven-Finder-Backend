import IUser from "./user.interface";

export default interface IChat {
    _id:string
    participants: string[]|IUser[];
    messages: string[]|IMessage[];
    lastMessage:string|IMessage; 
  }
  export interface IMessage {
    _id:string
    chatId: string;
    senderId: string;
    message: string;
    message_type: 'text' | 'image';
    message_time:Date
  }


  

