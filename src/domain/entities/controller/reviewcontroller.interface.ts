import { Request, Response, NextFunction } from "express";

export interface IReviewController {
  createReview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  editReview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  deleteReview(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getReviews(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
