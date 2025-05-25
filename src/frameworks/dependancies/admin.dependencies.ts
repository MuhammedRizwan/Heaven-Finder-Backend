import AdminRepository from "../../adapters/repositories/admin.repository";
import AgentRepository from "../../adapters/repositories/agent.repository";
import BookingRepository from "../../adapters/repositories/booking.repository";
import PackageRepository from "../../adapters/repositories/package.repository";
import UserRepository from "../../adapters/repositories/user.repositories";
import WalletRepository from "../../adapters/repositories/wallet.repository";
import AdminUseCase from "../../application/usecases/admin.usecase";
import EmailService from "../services/emailService";
import JwtService  from "../services/jwtService";


const Repositories = {
  AdminRepository: new AdminRepository(),
  UserRepository: new UserRepository(),
  AgentRepository: new AgentRepository(),
  PackageRepository: new PackageRepository(),
  BookingRepository: new BookingRepository(),
  WalletRepository: new WalletRepository()
};

const Services = {
  JwtService: new JwtService(),
  EmailService: new EmailService(),
};

const useCase = {
  AdminUseCase: new AdminUseCase({ Repositories, Services }),
};

const AdminDependencies= useCase;

export default AdminDependencies