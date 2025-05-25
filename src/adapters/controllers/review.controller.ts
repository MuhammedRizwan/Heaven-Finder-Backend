import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IReviewUseCase from "../../domain/entities/usecase/reviewusecase.interface";
import { IReviewControllerDependencies } from "../../domain/entities/depencies/reviewdependencies.interface";


export default class ReviewController {
  private _reviewUseCase: IReviewUseCase;

  constructor(dependencies: IReviewControllerDependencies) {
    this._reviewUseCase = dependencies.ReviewUseCase;
  }

  async createReview(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { bookingId } = req.params;
      const booking = await this._reviewUseCase.createReview(bookingId,req.body);
      return res
        .status(HttpStatusCode.OK)
        .json({
          success: true,
          message: "Review created successfully",
          booking,
        });
    } catch (error) {
      next(error);
    }
  }
  async editReview(req: Request, res: Response, next: NextFunction) : Promise<Response | void>{
    try {
      const { reviewId } = req.params;
      const review = await this._reviewUseCase.editReview(reviewId,req.body);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Review edited successfully", review });
    } catch (error) {
      next(error);
    }
  }
  async deleteReview(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { bookingId, reviewId } = req.params;
      const booking = await this._reviewUseCase.deleteReview(bookingId,reviewId);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Review deleted successfully", booking });
    } catch (error) {
      next(error);
    }
  }
  async getReviews(req: Request, res: Response, next: NextFunction) : Promise<Response | void>{
    try {
      const { packageId } = req.params;
      const review = await this._reviewUseCase.getReviews(packageId);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Reviews fetched successfully", review });
    } catch (error) {
      next(error);
    }
  }
}
