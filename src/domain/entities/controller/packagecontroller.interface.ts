import { Request, Response, NextFunction } from "express";

export default interface IPackageController {
  createPackage(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getAllPackages(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  editPackage(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  blockNUnblockPackage(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getPackageById(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getAgentPackages(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getSimilarPackages(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  updatePackageImage(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  deletePackageImage(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
}
