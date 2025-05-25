import IChatmessageUsecaseDependencies from "../../domain/entities/depencies/chatmessagedependencies.interface";
import IChat, { IMessage } from "../../domain/entities/model/chat.interface";
import IUser from "../../domain/entities/model/user.interface";
import IChatmessageRepository from "../../domain/entities/repository/chatmessagerepository.interface";
import IUserRepository from "../../domain/entities/repository/userrepository.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";


export default class ChatmessageUseCase {
  private _chatRepository: IChatmessageRepository;
  private _userRepository: IUserRepository;

  constructor(dependencies: IChatmessageUsecaseDependencies) {
    this._chatRepository = dependencies.Repositories.ChatRepository;
    this._userRepository = dependencies.Repositories.UserRepository;
  }

  async getContacts(search: string, userId: string | undefined): Promise<IUser[]> {
    try {
      const query = search
        ? { username: { $regex: search, $options: "i" } }
        : {};
      const users = await this._userRepository.getContacts(query, userId);
      if (!users) {
        throw new CustomError("No users found", HttpStatusCode.NOT_FOUND);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getChats(search: string, userId: string | undefined): Promise<{
    _id: string | undefined;
    chatId: string;
    username: string;
    profile_picture: string | null;
    lastMessage: string | null;
    unReadCount: number;
  }[]> {
    try {
      const query = search
        ? { username: { $regex: search, $options: "i" } }
        : {};
      const chats = await this._chatRepository.getChats(query, userId);
      if (!chats) {
        throw new CustomError("No users found", HttpStatusCode.NOT_FOUND);
      }

      const result = await Promise.all(
        chats.map(async (chat) => {
          const unReadCount = await this._chatRepository.getUnreadMessageCount(
            chat._id,
            userId
          );
          const otherParticipant = chat.participants[0];
          return {
            _id: (otherParticipant as IUser)?._id,
            chatId: chat._id,
            username: (otherParticipant as IUser)?.username,
            profile_picture:
              (otherParticipant as IUser)?.profile_picture || null,
            lastMessage: (chat.lastMessage as IMessage)?.message || null,
            unReadCount: unReadCount,
          };
        })
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getRoom(recieverId: string, senderId: string): Promise<IChat> {
    try {
      let room = await this._chatRepository.getRoom(recieverId, senderId);
      if (!room) {
        room = await this._chatRepository.createRoom(recieverId, senderId);
      }
      return room;
    } catch (error) {
      throw error;
    }
  }

  async getRoomMessage(roomId: string, userId: string): Promise<IChat> {
    try {
      const room = await this._chatRepository.getRoomById(roomId, userId);
      if (!room) {
        throw new CustomError("No room found", HttpStatusCode.NOT_FOUND);
      }

      return room;
    } catch (error) {
      throw error;
    }
  }
}
