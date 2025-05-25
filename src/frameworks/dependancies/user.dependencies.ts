import OTPRepository from "../../adapters/repositories/otp.repositories";
import UserRepository from "../../adapters/repositories/user.repositories";
import WalletRepository from "../../adapters/repositories/wallet.repository";
import UserUseCase from "../../application/usecases/user.usecase";
import CloudinaryService from "../services/cloudinaryService";
import EmailService from "../services/emailService";
import GenerateOtp from "../services/genarateOTP";
import JwtService from "../services/jwtService";
import PasswordService from "../services/passwordService";


const Repositories = {
  UserRepository: new UserRepository(),
  OTPRepository: new OTPRepository(),
  WalletRepository:new WalletRepository(),
};

const Services = {
  EmailService: new EmailService(),
  GenerateOtp: new GenerateOtp(),
  JwtService: new JwtService(), 
  PasswordService: new PasswordService(),
  CloudinaryService:new CloudinaryService(),
};

const useCase = {
  UserUseCase: new UserUseCase({ Repositories, Services }),
};

const UserDependencies = useCase;

export default UserDependencies