import ICouponRepository from "../repository/couponrepository.interace";
import ICouponUseCase from "../usecase/couponusecase.interface";

export default interface ICouponUsecaseDependencies {
    Repositories: {
        CouponRepository: ICouponRepository;
    };
}

export interface ICouponControllerDependencies {
    CouponUseCase: ICouponUseCase;
}