import { ObjectId } from "mongoose";
import IUser from "../model/user.interface";

export default interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  updateRefreshToken(
    id: string | undefined,
    refreshToken: string
  ): Promise<void>;
  getUser(id: string): Promise<IUser | null>;
  updateProfile(userId: string, userData: IUser): Promise<IUser | null>;
  updatePassword(userId: string, HashedPssword: string): Promise<IUser | null>;
  getAllUsersData(
    query: object,
    page: number,
    limit: number,
    filterData: object
  ): Promise<IUser[] | null>;
  changeUserStatus(id: ObjectId, is_block: boolean): Promise<IUser | null>;
  countUsers(query: object, filterData: object): Promise<number>;
  getContacts(
    query: object,
    userId: string | undefined
  ): Promise<IUser[] | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  verifyuser(email: string): Promise<IUser | null>;
  changePassword(email: string, password: string): Promise<IUser | null>;
  getUser(id: string): Promise<IUser | null>;
  getAllUsersCount(): Promise<{
    usercount: number;
    unblockeduser: number;
  }>;
}
