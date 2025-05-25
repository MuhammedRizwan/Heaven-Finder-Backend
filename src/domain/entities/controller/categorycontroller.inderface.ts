import { Request, Response, NextFunction } from "express";

export default interface ICategoryController {
  createCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAllCategories(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  blockNUnblockCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updateCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getUnblockedCategories(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
