import IAgentRepository from "../repository/agentrepository.interface";
import IBookingRepository from "../repository/bookingrepository.interface";
import IOTPRepository from "../repository/otprepository.interface";
import IPackageRepository from "../repository/packagerepository.interface";
import IWalletRepository from "../repository/walletrepository.interface";
import ICloudinaryService from "../services/cloudinaryservice.interface";
import IEmailService from "../services/emailservice.interface";
import IGenerateOtp from "../services/generateotpservice.interface";
import IJwtService from "../services/jwtservice.interface";
import IPasswordService from "../services/passwordservice.interface";
import IAgentUseCase from "../usecase/agentusecase.interface";


export default interface IagentUsecaseDependencies {
    Repositories: {
        AgentRepository: IAgentRepository;
        BookingRepository: IBookingRepository;
        PackageRepository: IPackageRepository;
        OTPRepository: IOTPRepository;
        WalletRepository: IWalletRepository;
    };
    Services: {
        EmailService: IEmailService;
        PasswordService: IPasswordService;
        JwtService: IJwtService;
        GenerateOtp: IGenerateOtp;
        CloudinaryService: ICloudinaryService;
    };
}

export interface IAgentControllerDependencies {
    AgentUseCase: IAgentUseCase;
}
