import AgentRepository from "../../adapters/repositories/agent.repository";
import BookingRepository from "../../adapters/repositories/booking.repository";
import OTPRepository from "../../adapters/repositories/otp.repositories";
import PackageRepository from "../../adapters/repositories/package.repository";
import WalletRepository from "../../adapters/repositories/wallet.repository";
import AgentUseCase from "../../application/usecases/agent.usecase";
import CloudinaryService from "../services/cloudinaryService";
import EmailService from "../services/emailService";
import GenerateOtp from "../services/genarateOTP";
import JwtService from "../services/jwtService";
import PasswordService from "../services/passwordService";


const Repositories = {
    AgentRepository:new AgentRepository(),
    BookingRepository:new BookingRepository(),
    PackageRepository:new PackageRepository(),
    OTPRepository:new OTPRepository(),
    WalletRepository: new WalletRepository(),
};

const Services = {
    EmailService: new EmailService(),
    PasswordService:new PasswordService(),
    JwtService: new JwtService(),
    GenerateOtp:new GenerateOtp(),
    CloudinaryService: new CloudinaryService(),
};

const useCase = {
    AgentUseCase: new AgentUseCase({ Repositories, Services }),
};

const AgentDependencies = useCase;

export default AgentDependencies