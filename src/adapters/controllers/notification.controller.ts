import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../domain/enum/httpstatus";
import { INotificationControllerDependencies } from "../../domain/entities/depencies/notificationdependencies.interface";
import INotificationUseCase from "../../domain/entities/usecase/notificationusecase.interface";




export default class NotificationController {
  private _NotificationUseCase: INotificationUseCase;
  constructor(dependencies: INotificationControllerDependencies) {
    this._NotificationUseCase = dependencies.NotificationUseCase;
  }
  async getAgentNotifications(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const notifications = await this._NotificationUseCase.getAgentNotifications(
        agentId
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "success", notifications });
    } catch (error) {
      next(error);
    }
  }
  async getUserNotifications(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params;
      const notifications = await this._NotificationUseCase.getAgentNotifications(
        userId
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "success", notifications });
    } catch (error) {
      next(error);
    }
  }
  async getAdminNotifications(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { adminId } = req.params;
      const notifications = await this._NotificationUseCase.getAdminNotifications(
        adminId
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "success", notifications });
    } catch (error) {
      next(error);
    }
  }
}
