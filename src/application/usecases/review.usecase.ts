import IReviewUsecaseDependencies from "../../domain/entities/depencies/reviewdependencies.interface";
import IBooking from "../../domain/entities/model/booking.intrface";
import IReview from "../../domain/entities/model/review.interface";
import IBookingRepository from "../../domain/entities/repository/bookingrepository.interface";
import IReviewRepository from "../../domain/entities/repository/reviewRepository.interface";
import IReviewUseCase from "../../domain/entities/usecase/reviewusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError  from "../../domain/errors/customError";


export default class ReviewUseCase implements IReviewUseCase {
  private _reviewRepository: IReviewRepository;
  private _bookingRepository: IBookingRepository;
  constructor(dependencies: IReviewUsecaseDependencies) {
    this._reviewRepository = dependencies.Repositories.ReviewRepository;
    this._bookingRepository = dependencies.Repositories.BookingRepository;
  }

  async createReview(bookingId: string, reviewData: IReview): Promise<IBooking> {
    try {
      const review = await this._reviewRepository.createReview(reviewData);
      if (!review) throw new CustomError("Review not created", HttpStatusCode.INTERNAL_SERVER_ERROR);
      const addToBooking = await this._bookingRepository.addReview(
        bookingId,
        review._id
      );
      if (!addToBooking)
        throw new CustomError("Review not added to booking", HttpStatusCode.INTERNAL_SERVER_ERROR);
      return addToBooking;
    } catch (error) {
      throw error;
    }
  }
  async editReview(reviewId: string, reviewData: IReview): Promise<IReview> {
    try {
      const review = await this._reviewRepository.editReview(
        reviewId,
        reviewData
      );
      if (!review) throw new CustomError("Review not created", HttpStatusCode.INTERNAL_SERVER_ERROR);
      return review;
    } catch (error) {
      throw error;
    }
  }
  async deleteReview(bookingId: string, reviewId: string):Promise<IBooking> {
    try {
      const review = await this._reviewRepository.deleteReview(reviewId);
      if (!review) throw new CustomError("Review not created", HttpStatusCode.INTERNAL_SERVER_ERROR);
      const deletedFromBooking = await this._bookingRepository.deleteReview(
        bookingId
      );
      if (!deletedFromBooking)
        throw new CustomError("Review not deleted from booking", HttpStatusCode.INTERNAL_SERVER_ERROR);
      return deletedFromBooking;
    } catch (error) {
      throw error;
    }
  }
  async getReviews(packageId: string): Promise<IReview[]> {
    try {
      const reviews = await this._reviewRepository.getReviews(packageId);
      if (!reviews) throw new CustomError("Reviews not found", HttpStatusCode.NOT_FOUND);
      return reviews;
    } catch (error) {
      throw error;
    }
  }
}
