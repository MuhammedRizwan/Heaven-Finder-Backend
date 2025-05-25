import { NextFunction, Request, Response } from "express";
import IUser from "../../domain/entities/model/user.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IUserUseCase from "../../domain/entities/usecase/userusecase.interface";
import { IUserControllerDependencies } from "../../domain/entities/depencies/userdependencies.interface";
import IUserController from "../../domain/entities/controller/usercontroller.interface";


export default class userController implements IUserController {
  private _UserUseCase: IUserUseCase;
  constructor(dependencies: IUserControllerDependencies) {
    this._UserUseCase = dependencies.UserUseCase;
  }
  async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, email, phone, password } = req.body as IUser;
      const user = await this._UserUseCase.signupUser({
        username,
        email,
        phone,
        password,
      });
      return res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, message: "User registered ", user });
    } catch (error) {
      return next(error);
    }
  }
  async loginUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body as IUser;
      const { user, accessToken, refreshToken } =
        await this._UserUseCase.signinUser(email, password);

      if (!user.is_verified) {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Verify the OTP",
          user,
          redirect: "/verification",
        });
      }
      req['user'] = { userId: user._id as string };

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Logged in successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return next(error);
    }
  }

  async OTPVerification(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { otp, user } = req.body;
      if (!user) {
        res.status(HttpStatusCode.NOT_FOUND).json({ success: false, message: "User Not Found" });
      }
      if (otp.length != 4) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: "Incorrect OTP" });
      }
      const { userData, accessToken, refreshToken } =
        await this._UserUseCase.OTPVerification(otp, user.email);

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP  Verified",
        user: userData,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return next(error);
    }
  }
  async sendOTP(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.body;
      const OTP = await this._UserUseCase.sendOTP(email);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Resend OTP", OTP });
    } catch (error) {
      return next(error);
    }
  }
  async changePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const user = await this._UserUseCase.changePassword(email, password);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Password changed", user });
    } catch (error) {
      return next(error);
    }
  }

  async RefreshAccessToken(req: Request, res: Response): Promise<Response | void> {
    try {
      const accessToken = await this._UserUseCase.refreshAccessToken(
        req.body.refreshToken
      );
      if (!accessToken) {
        return res.json("token expired");
      }
      return res.json({ accessToken: accessToken });
    } catch (error) {
      const err = error as Error;
      return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.message });
    }
  }
  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { user, accessToken, refreshToken } = await this._UserUseCase.googleLogin(req.body)
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Logged in successfully", user, accessToken, refreshToken });
    } catch (error) {
      return next(error);
    }
  }
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params
      const user = await this._UserUseCase.getProfile(userId)
      return res.status(HttpStatusCode.OK).json({ success: true, message: "user profile", user });
    } catch (error) {
      next(error)
    }
  }
  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params
      const user = await this._UserUseCase.updateProfile(userId, req.body, req.file)
      return res.status(HttpStatusCode.OK).json({ success: true, message: "user profile updated", user });

    } catch (error) {
      next(error)
    }
  }
  async validatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params
      const user = await this._UserUseCase.validatePassword(userId, req.body.oldPassword)
      return res.status(HttpStatusCode.OK).json({ success: true, message: "password validated", user });
    } catch (error) {
      next(error)
    }
  }
  async updatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params
      const user = await this._UserUseCase.updatePassword(userId, req.body.newPassword)
      return res.status(HttpStatusCode.OK).json({ success: true, message: "password updated", user });
    } catch (error) {
      next(error)
    }
  }
}
