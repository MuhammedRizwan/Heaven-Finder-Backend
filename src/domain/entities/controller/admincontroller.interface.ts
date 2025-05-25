import { NextFunction, Request, Response } from "express";

interface IAdminController {
  loginAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  RefreshAccessToken(req: Request, res: Response): Promise<Response | void>;
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  BlockUser(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAllAgencies(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  BlockAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  verifyAgentByAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getDashboard(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAllAgents(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAgentBookingData(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getBarChartData(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export default IAdminController