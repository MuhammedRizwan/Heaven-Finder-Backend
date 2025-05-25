import IOTPRepository from "../repository/otprepository.interface";
import IUserRepository from "../repository/userrepository.interface";
import IWalletRepository from "../repository/walletrepository.interface";
import ICloudinaryService from "../services/cloudinaryservice.interface";
import IEmailService from "../services/emailservice.interface";
import IGenerateOtp from "../services/generateotpservice.interface";
import IJwtService from "../services/jwtservice.interface";
import IPasswordService from "../services/passwordservice.interface";
import IUserUseCase from "../usecase/userusecase.interface";

export default interface IUserUsecaseDependencies {
  Repositories: {
    UserRepository: IUserRepository;
    OTPRepository: IOTPRepository;
    WalletRepository:IWalletRepository;
  };
  Services: {
    EmailService: IEmailService;
    GenerateOtp: IGenerateOtp;
    JwtService: IJwtService;
    PasswordService: IPasswordService;
    CloudinaryService:ICloudinaryService;
  };
}

export interface IUserControllerDependencies{
 UserUseCase: IUserUseCase;
}