import { NextFunction, Request, Response } from "express";
import { IAdminControllerDependencies } from "../../domain/entities/depencies/admindependencies.interface";
import IAdmin from "../../domain/entities/model/admin.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IAdminController from "../../domain/entities/controller/admincontroller.interface";
import IAdminUseCase from "../../domain/entities/usecase/adminusecase.interface";



export const isString = (value: unknown): value is string =>
  typeof value === "string";

export default class adminController implements IAdminController {
  private _AdminUseCase: IAdminUseCase;
  constructor(dependencies: IAdminControllerDependencies) {
    this._AdminUseCase = dependencies.AdminUseCase;
  }

  async loginAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body as IAdmin;
      const { admin, accessToken, refreshToken } =
        await this._AdminUseCase.loginAdmin(email, password);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Admin Logged In",
        admin,
        accessToken,
        refreshToken,
      });
      return
    } catch (error) {
      return next(error);
    }
  }
  async RefreshAccessToken(req: Request, res: Response): Promise<Response | void> {
    try {
      const accessToken = await this._AdminUseCase.refreshAccessToken(
        req.body.refreshToken
      );
      if (!accessToken) {
        return res.json("token expired");
      }
      return res.json({ accessToken });
    } catch (error) {
      const err = error as Error;
      return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.message });
    }
  }
  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const search = isString(req.query.search) ? req.query.search : "";
      const page = isString(req.query.page) ? parseInt(req.query.page, 10) : 1;
      const limit = isString(req.query.limit)
        ? parseInt(req.query.limit, 10)
        : 8;
      const filter = isString(req.query.filter) ? req.query.filter : "";
      const { data, totalItems, totalPages, currentPage } =
        await this._AdminUseCase.getAllUsers(search, page, limit, filter);
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Fetched All Users",
        filterData: data,
        totalItems,
        totalPages,
        currentPage,
      });
    } catch (error) {
      return next(error);
    }
  }
  async BlockUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id, is_block } = req.body;
      const user = await this._AdminUseCase.changeUserStatus(id, is_block);
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: `${user.is_block ? "user Blocked" : "User Unblocked"}`,
        user,
      });
    } catch (error) {
      return next(error);
    }
  }
  async getAllAgencies(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const search = isString(req.query.search) ? req.query.search : "";
      const page = isString(req.query.page) ? parseInt(req.query.page, 10) : 1;
      const limit = isString(req.query.limit)
        ? parseInt(req.query.limit, 10)
        : 8;
      const filter = isString(req.query.filter) ? req.query.filter : "";
      const { data, totalItems, totalPages, currentPage } =
        await this._AdminUseCase.getAllAgencies(search, page, limit, filter);
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Fetch all agencies",
        filterData: data,
        totalItems,
        totalPages,
        currentPage,
      });
    } catch (error) {
      return next(error);
    }
  }
  async BlockAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id, is_block } = req.body;
      const agent = await this._AdminUseCase.changeAgentStatus(id, is_block);
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: `${agent.is_block ? "user Blocked" : "User Unblocked"}`,
        agent,
      });
    } catch (error) {
      return next(error);
    }
  }
  async getAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const id = req.params.agentid;
      const agent = await this._AdminUseCase.getAgent(id);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Fetched Agent Data", agent });
    } catch (error) {
      return next(error);
    }
  }
  async verifyAgentByAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id, admin_verified } = req.body;
      const agent = await this._AdminUseCase.adminVerifyAgent(
        id,
        admin_verified
      );
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: `${agent.admin_verified == "accept"
          ? "Agency Aceepted"
          : "Agency Rejected"
          }`,
        agent,
      });
    } catch (error) {
      return next(error);
    }
  }
  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { users, agent, packages, bookings, revenue, unconfirmedagency } =
        await this._AdminUseCase.getDashboardData();
      return res
        .status(HttpStatusCode.OK)
        .json({
          success: true,
          message: "Dashboard data fetched successfully",
          users,
          agent,
          packages,
          bookings,
          revenue,
          unconfirmedagency,
        });
    } catch (error) {
      return next(error);
    }
  }
  async getAllAgents(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const agents = await this._AdminUseCase.getAllAgents();
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Fetched all agents", agents });
    } catch (error) {
      return next(error);
    }
  }
  async getAgentBookingData(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params
      const bookingData = await this._AdminUseCase.getAgentBookingData(agentId);
      return res.status(HttpStatusCode.OK).json({ success: true, message: "Fetched agent booking data", bookingData });
    } catch (error) {
      next(error);
    }
  }
  async getBarChartData(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const barChartData = await this._AdminUseCase.getBarChartData();
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Fetched bar chart data", barChartData });
    } catch (error) {
      return next(error);
    }
  }
}
