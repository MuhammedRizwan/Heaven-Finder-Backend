import { NextFunction, Request, Response } from "express";
import IAgent from "../../domain/entities/model/agent.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IAgentController from "../../domain/entities/controller/agentcontroller.interface";
import IAgentUseCase from "../../domain/entities/usecase/agentusecase.interface";
import { IAgentControllerDependencies } from "../../domain/entities/depencies/agentdependencies.interface";



export default class AgentController implements IAgentController {
  private _AgentUseCase: IAgentUseCase;

  constructor(dependencies: IAgentControllerDependencies) {
    this._AgentUseCase = dependencies.AgentUseCase;
  }
  async createAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agency_name, email, phone, location, password } =
        req.body as IAgent;
      const agent = await this._AgentUseCase.signupAgent(
        {
          agency_name,
          email,
          phone,
          location,
          password,
          DocumentURL: undefined,
        },
        { Document: req.file }
      );
      return res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, message: "Agency Registered", agent });
    } catch (error) {
      return next(error);
    }
  }
  async loginAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body as IAgent;
      const { agent, accessToken, refreshToken } =
        await this._AgentUseCase.loginAgent(email, password);
      if (!agent.admin_verified) {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          status: "error",
          message: "Please verify Email",
          agent,
          redirect: "/agent/verification",
        });
      }
      return res
        .status(HttpStatusCode.OK)
        .json({
          success: true,
          message: "Agency Logged In",
          agent,
          accessToken,
          refreshToken,
        });
    } catch (error) {
      return next(error);
    }
  }

  async OTPVerification(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { Otp, agent } = req.body;
      if (!agent) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: "Agency Not Found" });
      }
      if (Otp.length != 4) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: "Incorrect OTP" });
      }
      const agentData = await this._AgentUseCase.OTPVerification(
        Otp,
        agent.email
      );
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP  Verified",
        agent: agentData,
      });
    } catch (error) {
      return next(error);
    }
  }

  async sendOTP(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.body;
      const OTPData = await this._AgentUseCase.sendOTP(email);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "OTP Resend", OTPData });
    } catch (error) {
      return next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const agent = await this._AgentUseCase.changePassword(
        email,
        password
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Password Changed", agent });
    } catch (error) {
      return next(error);
    }
  }

  async RefreshAccessToken(req: Request, res: Response): Promise<Response | void> {
    try {
      const accessToken = await this._AgentUseCase.refreshAccessToken(
        req.body.refreshToken
      );
      return res.status(HttpStatusCode.OK).json({ accessToken });
    } catch (error) {
      const err = error as Error;
      return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.message });
    }
  }
  async getAgent(req: Request, res: Response, next: NextFunction) {
    try {
      const { agentId } = req.params;
      const agent = await this._AgentUseCase.getAgent(agentId);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Fetched Agent Data", agent });
    } catch (error) {
      next(error);
    }
  }
  async updateAgent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const file = req.file as Express.Multer.File;
      const agent = await this._AgentUseCase.updateAgent(
        agentId,
        req.body,
        file
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Updated Agent Data", agent });
    } catch (error) {
      next(error);
    }
  }
  async validatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const agent = await this._AgentUseCase.validatePassword(
        agentId,
        req.body.oldPassword
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "password validated", agent });
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const agent = await this._AgentUseCase.updatePassword(
        agentId,
        req.body.newPassword
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "password updated", agent });
    } catch (error) {
      next(error);
    }
  }
  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const { packages, booking, bookingRevenue } =
        await this._AgentUseCase.getDashboard(agentId);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Dashboard Data", packages, booking, bookingRevenue });
    } catch (error) {
      next(error);
    }
  }
  async getBarChart(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const barChartData = await this._AgentUseCase.getBarChart(agentId);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Dashboard Data", barChartData });
    } catch (error) {
      next(error);
    }
  }
}
