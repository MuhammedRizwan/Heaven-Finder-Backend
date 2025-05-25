import IAdmin from "../../domain/entities/model/admin.interface";
import adminModel from "../database/models/admin.model";
import CustomError from "../../domain/errors/customError";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IAdminRepository from "../../domain/entities/repository/adminrepository.interface";

export default class AdminRepository implements IAdminRepository {
  async findAdminByEmail(email: string): Promise<IAdmin | null> {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return admin;
    }
    const adminData: IAdmin = {
      ...(admin.toObject() as unknown as IAdmin),
      _id: admin._id as string,
    };
    return adminData;
  }
  async changePassword(email: string, password: string) {
    const updatedAdmin = await adminModel.findOneAndUpdate(
      { email },
      { $set: { password: password } },
      { new: true }
    );
    if (!updatedAdmin) {
      return null;
    }
    const adminData: IAdmin = {
      ...(updatedAdmin.toObject() as unknown as IAdmin),
      _id: updatedAdmin._id as string,
    };
    return adminData;
  }
  async getAdmin(id: string): Promise<IAdmin | null> {
    try {
      const admin: IAdmin | null = await adminModel.findOne({ _id: id });
      if (!admin) {
        throw new CustomError("admin not found", HttpStatusCode.NOT_FOUND);
      }
      return admin;
    } catch (error) {
      throw error;
    }
  }
  async addRefreshToken(id: string, refreshToken: string): Promise<void> {
    try {
      const updatedAdmin = await adminModel.findOneAndUpdate(
        { _id: id },
        { $set: { refreshToken: refreshToken } },
        { new: true }
      );
      if (!updatedAdmin) {
        throw new CustomError("admin not found", HttpStatusCode.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
