import { Request, Response, NextFunction } from "express";

export default interface IAgentController {
  createAgent(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  loginAgent(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  OTPVerification(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  sendOTP(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  changePassword(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  RefreshAccessToken(req: Request, res: Response):Promise<Response|void> ;
  getAgent(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  updateAgent(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  validatePassword(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  updatePassword(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getDashboard(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getBarChart(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
}
