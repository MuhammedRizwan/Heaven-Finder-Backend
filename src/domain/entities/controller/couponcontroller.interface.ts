import { NextFunction, Request, Response } from "express";

export default interface ICouponController {
    createCoupon(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getAllCoupons(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    editCoupon(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    blockCoupon(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getUnblockedCoupons(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getUsedCoupons(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
