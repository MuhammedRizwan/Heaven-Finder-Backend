import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IWalletUseCase from "../../domain/entities/usecase/walletusecase.interface";
import { IwalletControllerDependencies } from "../../domain/entities/depencies/walletdependencies.interface";
import IWalletController from "../../domain/entities/controller/walletcontroller.interface";

export default class walletController implements IWalletController{
  private _walletUseCase: IWalletUseCase;
  constructor(dependencies: IwalletControllerDependencies) {
    this._walletUseCase = dependencies.WalletUseCase;
  }
  async getAllWallet(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { userId } = req.params;
      const wallet = await this._walletUseCase.getAllWallet(userId);
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Fetched All Wallet",
        wallet,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkBalance(req: Request, res: Response, next: NextFunction) :Promise<Response|void>{
    try {
      const { userId, amount } = req.body;
      console.log(userId, amount)
      const wallet = await this._walletUseCase.checkBalance(userId, amount);
      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Fetched All Wallet",
        wallet,
      });
    } catch (error) {
      next(error);
    }
  }
}
