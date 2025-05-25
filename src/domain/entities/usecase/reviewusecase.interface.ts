import IReview from "../../../domain/entities/model/review.interface";
import IBooking from "../model/booking.intrface";

export default interface IReviewUseCase {
  createReview(bookingId: string, reviewData: IReview): Promise<IBooking>;
  editReview(reviewId: string, reviewData: IReview): Promise<IReview>;
  deleteReview(bookingId: string, reviewId: string): Promise<IBooking>;
  getReviews(packageId: string): Promise<IReview[]>;
}
