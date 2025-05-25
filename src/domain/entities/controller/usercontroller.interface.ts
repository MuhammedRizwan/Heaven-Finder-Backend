import { Request, Response, NextFunction } from "express";

export default interface IUserController {
  createUser(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  loginUser(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  OTPVerification(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  sendOTP(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  changePassword(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  RefreshAccessToken(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  googleLogin(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  getProfile(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  updateProfile(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  validatePassword(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
  updatePassword(req: Request, res: Response, next: NextFunction):Promise<Response|void>;
}
