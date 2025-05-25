import { IRazorPay } from "../model/booking.intrface";
import IBookingRepository from "../repository/bookingrepository.interface";
import ICouponRepository from "../repository/couponrepository.interace";
import IPackageRepository from "../repository/packagerepository.interface";
import IWalletRepository from "../repository/walletrepository.interface";
import IBookingUseCase  from "../usecase/bookingusecase.interface";


export default interface IBookingUsecaseDependencies {
    Repositories: {
        BookingRepository: IBookingRepository;
        PackageRepository: IPackageRepository;
        CouponRepository: ICouponRepository;
        WalletRepository: IWalletRepository;
    };
    Services: {
        RazorPay: IRazorPay;
      
    };
}

export interface IBookingControllerDependencies {
    BookingUseCase: IBookingUseCase;
}

