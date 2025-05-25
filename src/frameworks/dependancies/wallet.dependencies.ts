import WalletRepository from "../../adapters/repositories/wallet.repository";
import  RazorPay from "../services/razorpayService";
import WalletUseCase  from "../../application/usecases/wallet.usecase";

const Repositories = {
  WalletRepository: new WalletRepository(),
};

const Services = {
  RazorPay: new RazorPay(), 
};

const useCase = {
  WalletUseCase: new WalletUseCase({ Repositories, Services }),
};

export const WalletDependencies = useCase;


export default WalletDependencies