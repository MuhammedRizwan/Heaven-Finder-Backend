import BookingRepository from "../../adapters/repositories/booking.repository";
import ReviewRepository from "../../adapters/repositories/review.repository";
import ReviewUseCase from "../../application/usecases/review.usecase";

const Repositories = {
  ReviewRepository: new ReviewRepository(),
  BookingRepository: new BookingRepository(),
};

const useCase = {
  ReviewUseCase: new ReviewUseCase({ Repositories }),
};

const ReviewDependencies = useCase;

export default ReviewDependencies