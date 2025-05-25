import { Request, Response, NextFunction } from "express";

export interface INotificationController {
    getAgentNotifications(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getUserNotifications(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getAdminNotifications(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

