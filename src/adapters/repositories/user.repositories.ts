import { FilterQuery, ObjectId } from "mongoose";
import IUser  from "../../domain/entities/model/user.interface";
import CustomError from "../../domain/errors/customError";
import userModel from "../database/models/user.model";
import HttpStatusCode from "../../domain/enum/httpstatus";

export default class UserRepository {
  async createUser(user: IUser): Promise<IUser> {
    const userCreate = await userModel.create(user);
    const userData: IUser = {
      ...(userCreate.toObject() as unknown as IUser),
      _id: userCreate._id.toString(),
    };
    return userData;
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await userModel.findOne({ email });
    if (!user) {
      return user;
    }
    const userData: IUser = {
      ...(user.toObject() as unknown as IUser),
      _id: user._id.toString(),
    };
    return userData;
  }
  async verifyuser(email: string): Promise<IUser | null> {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $set: { is_verified: true } },
      { new: true }
    );
    if (!updatedUser) {
      return null;
    }
    const userData: IUser = {
      ...(updatedUser.toObject() as unknown as IUser),
      _id: updatedUser._id.toString(),
    };
    return userData;
  }
  async changePassword(email: string, password: string) {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $set: { password: password } },
      { new: true }
    );
    if (!updatedUser) {
      return null;
    }
    const userData: IUser = {
      ...(updatedUser.toObject() as unknown as IUser),
      _id: updatedUser._id.toString(),
    };

    return userData;
  }
  async getAllUsersData(
    query: FilterQuery<IUser>,
    page: number,
    limit: number,
    filterData: object
  ): Promise<IUser[] | null> {
    const completeQuery = { ...query, ...filterData };
    const users = await userModel
      .find(completeQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    return users.map((user) => {
      const userData: IUser = {
        ...(user.toObject() as unknown as IUser),
        _id: user._id.toString(),
      };
      return userData;
    });
  }
  async changeUserStatus(
    id: ObjectId,
    is_block: boolean
  ): Promise<IUser | null> {
    const updatedUser: IUser | null = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { is_block } },
      { new: true }
    );
    return updatedUser;
  }
  async getUser(id: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await userModel.findById(id);
      if (!user) {
        throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    try {
      const updatedUser: IUser | null = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: { refreshToken } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
  async countUsers(
    query: FilterQuery<IUser>,
    filterData: object
  ): Promise<number> {
    const completedQuery = { ...query, ...filterData };
    return await userModel.countDocuments(completedQuery);
  }
  async updateProfile(id: string, userData: IUser): Promise<IUser | null> {
    try {
      const user: IUser | null = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: userData },
        { new: true }
      );
      if (!user) {
        throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(id: string, password: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: { password } },
        { new: true }
      );
      if (!user) {
        throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getContacts(
    query: FilterQuery<IUser>,
    userId: string | undefined
  ): Promise<IUser[] | null> {
    try {
      const completedQuery = {
        ...query,
        is_block: false,
        _id: { $ne: userId },
      };
      const users: IUser[] | null = await userModel.find(completedQuery, {
        _id: 1,
        username: 1,
        email: 1,
        profile_picture: 1,
      });
      if (!users) {
        throw new CustomError("No users found", HttpStatusCode.NOT_FOUND);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getAllUsersCount(): Promise<{
    usercount: number;
    unblockeduser: number;
  }> {
    try {
      const usercount = await userModel.countDocuments();
      const unblockeduser = await userModel.countDocuments({ is_block: false });
      return { usercount,unblockeduser };
    } catch (error) {
      throw error;
    }
  }
}
