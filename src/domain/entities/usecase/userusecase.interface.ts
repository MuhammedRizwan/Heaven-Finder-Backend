import IUser  from "../../../domain/entities/model/user.interface";

export default interface IUserUseCase {
  signupUser(userData: IUser): Promise<IUser>;
  signinUser(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }>;
  googleLogin(googleUser: any): Promise<{ user: IUser; accessToken: string; refreshToken: string }>;
  getProfile(userId: string): Promise<IUser>;
  updateProfile(userId: string, userData: IUser, file?: Express.Multer.File): Promise<IUser>;
  validatePassword(userId: string, password: string): Promise<IUser>;
  updatePassword(userId: string, password: string): Promise<IUser>;
  refreshAccessToken(token: string): Promise<string>;
  OTPVerification(otp: string, email: string): Promise<{ userData: IUser; accessToken: string; refreshToken: string }>;
  sendOTP(email: string): Promise<{ email: string; otp: string }>;
  changePassword(email: string, password: string): Promise<IUser>;
}
