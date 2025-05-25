import { NextFunction, Request, Response } from "express";

export interface IOfferController {
    getAllOffers(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    createOffer(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    getOffer(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    updateOffer(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    blockNUnblockOffer(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    addofferPackage(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    execute(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
}
