import IAdminRepository from "../repository/adminrepository.interface";
import IAgentRepository from "../repository/agentrepository.interface";
import IBookingRepository from "../repository/bookingrepository.interface";
import IPackageRepository from "../repository/packagerepository.interface";
import IUserRepository from "../repository/userrepository.interface";
import IWalletRepository from "../repository/walletrepository.interface";
import IEmailService from "../services/emailservice.interface";
import IJwtService from "../services/jwtservice.interface";
import IAdminUseCase from "../usecase/adminusecase.interface";

export default interface IAdminUsecaseDependencies {
  Repositories: {
    AdminRepository: IAdminRepository;
    UserRepository: IUserRepository;
    AgentRepository: IAgentRepository;
    PackageRepository: IPackageRepository;
    BookingRepository: IBookingRepository;
    WalletRepository: IWalletRepository;

  };
  Services: {
    JwtService: IJwtService;
    EmailService: IEmailService;
  };
}


export interface IAdminControllerDependencies {
  AdminUseCase: IAdminUseCase;
}