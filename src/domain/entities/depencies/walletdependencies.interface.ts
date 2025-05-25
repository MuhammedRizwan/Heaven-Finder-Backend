import { IRazorPay } from "../model/booking.intrface"
import IWalletRepository from "../repository/walletrepository.interface"
import IWalletUseCase from "../usecase/walletusecase.interface"

export default interface IWalletUsecaseDependencies {
    Repositories: {
        WalletRepository: IWalletRepository
    },
    Services: {
        RazorPay: IRazorPay
    }
}

export interface IwalletControllerDependencies {
    WalletUseCase: IWalletUseCase;
}