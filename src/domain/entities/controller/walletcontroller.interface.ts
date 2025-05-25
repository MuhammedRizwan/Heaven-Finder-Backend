import { Request, Response, NextFunction } from "express";

export default interface IWalletController {
  getAllWallet(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  checkBalance(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
