import BookingRepository from "../../adapters/repositories/booking.repository";
import CouponRepository from "../../adapters/repositories/coupon.repository";
import PackageRepository from "../../adapters/repositories/package.repository";
import WalletRepository from "../../adapters/repositories/wallet.repository";
import BookingUseCase from "../../application/usecases/booking.usecase";
import RazorPay from "../services/razorpayService";


const Repositories = {
    BookingRepository: new BookingRepository(),
    PackageRepository: new PackageRepository(),
    CouponRepository:new CouponRepository(),
    WalletRepository:new WalletRepository()
};

const Services = {
    RazorPay: new RazorPay(),
};

const useCase = {
    BookingUseCase: new BookingUseCase({ Repositories, Services }),
};

const BookingDependencies = useCase;

export default BookingDependencies;
