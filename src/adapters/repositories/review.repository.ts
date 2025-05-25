import IReview from "../../domain/entities/model/review.interface";
import IUser from "../../domain/entities/model/user.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";
import reviewModel from "../database/models/review.modal";

export default class ReviewRepository {
  async createReview(reviewData: IReview): Promise<IReview> {
    try {
      const reviewDoc = await reviewModel.create(reviewData);
      if (!reviewDoc) throw new CustomError("Review not created", HttpStatusCode.INTERNAL_SERVER_ERROR);
      const review: IReview = reviewDoc.toObject() as unknown as IReview;
      return review;
    } catch (error) {
      throw error;
    }
  }
  async editReview(reviewId: string, reviewData: IReview): Promise<IReview> {
    try {
      const reviewDoc = await reviewModel.findByIdAndUpdate(
        reviewId,
        reviewData,
        { new: true }
      );
      if (!reviewDoc) throw new CustomError("Review not created", HttpStatusCode.INTERNAL_SERVER_ERROR);
      const review: IReview = reviewDoc.toObject() as unknown as IReview;
      return review;
    } catch (error) {
      throw error;
    }
  }
  async deleteReview(reviewId: string) {
    try {
      const deletedReview = await reviewModel.findByIdAndDelete(reviewId);
      if (deletedReview) {
        return true;
      } else {
        throw new CustomError("Review not deleted", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      throw error;
    }
  }
  async getReviews(packageId: string): Promise<IReview[]> {
    try {
      const reviews = await reviewModel.find({ package_id: packageId }).populate<{ user_id: IUser }>("user_id");
      if (!reviews) throw new CustomError("Reviews not found", HttpStatusCode.NOT_FOUND);
      return reviews as unknown as IReview[];
    } catch (error) {
      throw error;
    }
  }
}
