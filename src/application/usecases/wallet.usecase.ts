import IWalletUsecaseDependencies from "../../domain/entities/depencies/walletdependencies.interface";
import IWalletRepository from "../../domain/entities/repository/walletrepository.interface";
import IWalletUseCase from "../../domain/entities/usecase/walletusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";

export default class WalletUseCase implements IWalletUseCase {
  private walletRepository: IWalletRepository;

  constructor(dependencies: IWalletUsecaseDependencies) {
    this.walletRepository = dependencies.Repositories.WalletRepository;
  }
  async getAllWallet(user_id: string) {
    const wallet = await this.walletRepository.getWallet(user_id);
    if (!wallet) {
      throw new CustomError("Wallet Not Found", HttpStatusCode.NOT_FOUND);
    }
    return wallet;
  }
  async checkBalance(user_id: string, amount: number) {
    const wallet = await this.walletRepository.getWallet(user_id);
    if (!wallet) {
      throw new CustomError("Wallet Not Found", HttpStatusCode.NOT_FOUND);
    }
    if (wallet.walletBalance < amount) {
      throw new CustomError("Insufficient Balance", HttpStatusCode.BAD_REQUEST);
    }
    return wallet;
  }
}
