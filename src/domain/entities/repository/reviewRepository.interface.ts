import IReview from "../model/review.interface";

export default interface IReviewRepository {
    createReview(reviewData: IReview): Promise<IReview>;
    editReview(reviewId: string, reviewData: IReview): Promise<IReview>;
    deleteReview(reviewId: string): Promise<boolean>;
    getReviews(packageId: string): Promise<IReview[]>;
  }