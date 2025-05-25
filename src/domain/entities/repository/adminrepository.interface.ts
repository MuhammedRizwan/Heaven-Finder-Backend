import IAdmin from "../model/admin.interface";

export default interface IAdminRepository {
  changePassword(email: string, password: string): unknown;
  findAdminByEmail(email: string): Promise<IAdmin | null>;
  getAdmin(id: string): Promise<IAdmin | null>;
  addRefreshToken(id: string | undefined, refreshToken: string): Promise<void>;
}