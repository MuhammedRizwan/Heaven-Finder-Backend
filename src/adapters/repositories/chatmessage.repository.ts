import { FilterQuery } from "mongoose";
import chatModel from "../database/models/chat.model";
import MessageModel from "../database/models/message.model";
import IChat, { IMessage } from "../../domain/entities/model/chat.interface";

export default class ChatRepository {
  async saveMessage(
    roomId: string,
    senderId: string,
    message: string,
    message_time: Date,
    message_type: string
  ) {
    try {
      const newMessage = await MessageModel.create({
        chatId: roomId,
        senderId,
        message,
        message_time,
        message_type,
      });

      await chatModel.findByIdAndUpdate(
        roomId,
        {
          $push: { messages: newMessage._id },
          $set: { lastMessage: newMessage._id },
        },
        { new: true }
      );
      return newMessage as unknown as IMessage;
    } catch (error) {
      throw error;
    }
  }

  async getMessagesByRoom(roomId: string): Promise<IChat> {
    try {
      const room = await chatModel.findById(roomId).populate({
        path: "messages",
        populate: {
          path: "senderId",
          select: "_id username email profile_picture",
        },
      });

      if (!room) {
        throw new Error("Room not found");
      }

      if (room.messages.length === 0) {
        return { ...room.toObject(), messages: [] } as unknown as IChat;
      }

      return room as unknown as IChat;
    } catch (error) {
      console.error("Error fetching room messages:", error);
      throw error;
    }
  }

  async getRoom(recieverId: string, senderId: string): Promise<IChat | null> {
    try {
      const room = await chatModel.findOne({
        participants: { $all: [recieverId, senderId] },
      });
      return room as unknown as IChat;
    } catch (error) {
      throw error;
    }
  }
  async createRoom(recieverId: string, senderId: string): Promise<IChat> {
    try {
      const room = await chatModel.create({
        participants: [recieverId, senderId],
      });
      return room as unknown as IChat;
    } catch (error) {
      throw error;
    }
  }
  async getRoomById(roomId: string, userId: String): Promise<IChat | null> {
    try {
      await MessageModel.updateMany(
        { chatId: roomId, senderId: { $ne: userId }, isRead: false },
        { $set: { isRead: true } }
      );
      const room = await chatModel
        .findById(roomId)
        .populate("participants", "_id username email profile_picture")
        .populate("messages");
      return room as unknown as IChat;
    } catch (error) {
      throw error;
    }
  }
  async getChats(
    query: FilterQuery<IChat>,
    userId: string
  ): Promise<IChat[] | null> {
    const chats = await chatModel
      .find({ participants: userId }, { _id: 1, participants: 1, lastMessage: 1 })
      .populate({
        path: "participants",
        match: { _id: { $ne: userId } },
        select: "username email profile_picture",
      })
      .populate({
        path: "lastMessage",
        select: "message -_id",
      })
      .exec();

    return chats as unknown as IChat[];
  }
  async getUnreadMessageCount(chatId: string, userId: string): Promise<number> {
    const chatCount: number = await MessageModel.countDocuments({
      chatId, senderId: { $ne: userId },
      isRead: false,
    })
    return chatCount
  }
}
