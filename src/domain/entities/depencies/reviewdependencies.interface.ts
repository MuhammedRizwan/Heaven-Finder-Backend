import IBookingRepository from "../repository/bookingrepository.interface";
import IReviewRepository from "../repository/reviewRepository.interface";
import IReviewUseCase from "../usecase/reviewusecase.interface";

 export default interface IReviewUsecaseDependencies {
  Repositories: {
    ReviewRepository: IReviewRepository;
    BookingRepository:IBookingRepository;
  };
}

export interface IReviewControllerDependencies{
    ReviewUseCase: IReviewUseCase;
}