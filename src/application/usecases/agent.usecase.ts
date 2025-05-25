import IagentUsecaseDependencies from "../../domain/entities/depencies/agentdependencies.interface";
import IAgent from "../../domain/entities/model/agent.interface";
import IOTP from "../../domain/entities/model/otp.interface";
import IAgentRepository from "../../domain/entities/repository/agentrepository.interface";
import IBookingRepository from "../../domain/entities/repository/bookingrepository.interface";
import IOTPRepository from "../../domain/entities/repository/otprepository.interface";
import IPackageRepository from "../../domain/entities/repository/packagerepository.interface";
import IWalletRepository from "../../domain/entities/repository/walletrepository.interface";
import ICloudinaryService from "../../domain/entities/services/cloudinaryservice.interface";
import IEmailService from "../../domain/entities/services/emailservice.interface";
import IGenerateOtp from "../../domain/entities/services/generateotpservice.interface";
import IJwtService from "../../domain/entities/services/jwtservice.interface";
import IPasswordService from "../../domain/entities/services/passwordservice.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";
import IAgentUseCase, { AgentBarChartData, AgentDashboardData, AgentTokenResponse } from "../../domain/entities/usecase/agentusecase.interface";


export default class AgentUseCase implements IAgentUseCase {
  private _agentRepository: IAgentRepository;
  private _bookingRepository: IBookingRepository;
  private _packageRepository: IPackageRepository;
  private _OTPRepository: IOTPRepository;
  private _walletRepository: IWalletRepository;
  private _emailService: IEmailService;
  private _passwordService: IPasswordService;
  private _JwtService: IJwtService;
  private _generateOtp: IGenerateOtp;
  private _CloudinaryService: ICloudinaryService;

  constructor(Dependencies: IagentUsecaseDependencies) {
    this._agentRepository = Dependencies.Repositories.AgentRepository;
    this._bookingRepository = Dependencies.Repositories.BookingRepository;
    this._packageRepository = Dependencies.Repositories.PackageRepository;
    this._OTPRepository = Dependencies.Repositories.OTPRepository;
    this._walletRepository = Dependencies.Repositories.WalletRepository;
    this._emailService = Dependencies.Services.EmailService;
    this._passwordService = Dependencies.Services.PasswordService;
    this._JwtService = Dependencies.Services.JwtService;
    this._generateOtp = Dependencies.Services.GenerateOtp;
    this._CloudinaryService = Dependencies.Services.CloudinaryService;
  }
  async signupAgent(
    agentData: IAgent,
    file: { Document: Express.Multer.File | undefined }
  ): Promise<IAgent> {
    try {
      const existUser = await this._agentRepository.findAgentByEmail(
        agentData.email
      );
      if (existUser) {
        throw new CustomError("user already exists", HttpStatusCode.CONFLICT);
      }
      let uploadDocumentUrl: string | null = null;
      if (file.Document) {
        const fileType = file.Document?.mimetype;
        if (fileType === "application/pdf") {
          const pdfUrl = await this._CloudinaryService.uploadPDF(file.Document);
          if (!pdfUrl) {
            throw new CustomError("pdf cannot upload to cloudinary", HttpStatusCode.INTERNAL_SERVER_ERROR);
          }
          agentData.DocumentURL = pdfUrl;
        } else if (fileType.startsWith("image/")) {
          const imageUrl = await this._CloudinaryService.uploadImage(
            file.Document
          );
          if (!imageUrl) {
            throw new CustomError("image cannot upload to cloudinary", HttpStatusCode.INTERNAL_SERVER_ERROR);
          }
          agentData.DocumentURL = imageUrl;
        }
      }

      agentData.password = await this._passwordService.passwordHash(
        agentData.password
      );
      const verificationOtp = this._generateOtp.generate();
      if (!verificationOtp) {
        throw new CustomError("something went wrong", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      const createOTP = await this._OTPRepository.createOTP({
        email: agentData.email,
        otp: verificationOtp,
      });
      if (!createOTP) {
        throw new CustomError("OTP creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      await this._emailService.sendVerificationEmail(
        agentData.email,
        verificationOtp
      );
      const agent = await this._agentRepository.createAgent(agentData);
      if (!agent) {
        throw new CustomError("cannot signup user", HttpStatusCode.NOT_FOUND);
      }

      return agent;
    } catch (error) {
      throw error;
    }
  }
  async loginAgent(email: string, password: string): Promise<AgentTokenResponse> {
    const agent = await this._agentRepository.findAgentByEmail(email);
    if (!agent) {
      throw new CustomError("Email Not Found", HttpStatusCode.NOT_FOUND);
    }
    const verifiedPassword = await this._passwordService.verifyPassword(
      password,
      agent.password
    );
    if (!verifiedPassword) {
      throw new CustomError("Invalid password", HttpStatusCode.FORBIDDEN);
    }
    if (agent.is_block) {
      throw new CustomError("Agency has been Blocked", HttpStatusCode.FORBIDDEN);
    }
    if (!agent.is_verified) {
      const verificationOtp = this._generateOtp.generate();
      if (!verificationOtp) {
        throw new CustomError("couldn't genarate OTP", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      const createOTP = await this._OTPRepository.createOTP({
        email: agent.email,
        otp: verificationOtp,
      });
      if (!createOTP) {
        throw new CustomError("OTP creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      await this._emailService.sendVerificationEmail(
        agent.email,
        verificationOtp
      );
    }
    if (agent.admin_verified == "reject") {
      throw new CustomError("Agency were Rejected", HttpStatusCode.BAD_REQUEST);
    }
    if (agent.admin_verified !== "accept") {
      throw new CustomError("Agency are not verified", HttpStatusCode.BAD_REQUEST);
    }
    const accessToken = this._JwtService.generateAccessToken(agent._id);
    if (!accessToken) {
      throw new CustomError("couldn't genarate token", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    const refreshToken = this._JwtService.generateRefreshToken(agent._id);
    if (!refreshToken) {
      throw new CustomError("couldn't genarate token", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    await this._agentRepository.addRefreshToken(agent._id, refreshToken);
    return {
      agent,
      accessToken,
      refreshToken,
    };
  }
  async getAgent(agentId: string): Promise<IAgent> {
    try {
      const agent = await this._agentRepository.getAgent(agentId);
      if (!agent) {
        throw new CustomError("Agent not found", HttpStatusCode.NOT_FOUND);
      }
      return agent;
    } catch (error) {
      throw error;
    }
  }
  async updateAgent(agentId: string, agentData: IAgent, file: Express.Multer.File | undefined): Promise<IAgent> {
    try {
      const image = file
        ? await this._CloudinaryService.uploadImage(file)
        : null;
      if (image) {
        agentData.profile_picture = image;
      }
      const agent = await this._agentRepository.updateAgent(agentId, agentData);
      if (!agent) {
        throw new CustomError("Agent not found", HttpStatusCode.NOT_FOUND);
      }
      return agent;
    } catch (error) {
      throw error;
    }
  }
  async validatePassword(agentId: string, password: string): Promise<IAgent>{
    try {
      const agent = await this._agentRepository.getAgent(agentId);
      if (!agent) {
        throw new CustomError("Agent not found", HttpStatusCode.NOT_FOUND);
      }
      const verifiedPassword = await this._passwordService.verifyPassword(
        password,
        agent.password
      );
      if (!verifiedPassword) {
        throw new CustomError("Invalid password", HttpStatusCode.NOT_FOUND);
      }
      return agent;
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(agentId: string, newPassword: string): Promise<IAgent> {
    try {
      const agent = await this._agentRepository.updatePassword(
        agentId,
        newPassword
      );
      if (!agent) {
        throw new CustomError("Agent not found", HttpStatusCode.NOT_FOUND);
      }
      return agent;
    } catch (error) {
      throw error;
    }
  }
  async getDashboard(agentId: string): Promise<AgentDashboardData> {
    try {
      const packages = await this._packageRepository.getpackageCount(agentId);
      if (!packages) {
        throw new CustomError("packages not found", HttpStatusCode.NOT_FOUND);
      }
      const booking = await this._bookingRepository.getAgentBookingData(
        agentId
      );
      if (!booking) {
        throw new CustomError("booking not found", HttpStatusCode.NOT_FOUND);
      }
      const bookingRevenue =
        await this._bookingRepository.getAgentBookingRevenue(agentId);
      if (!bookingRevenue) {
        throw new CustomError("revenue not found", HttpStatusCode.NOT_FOUND);
      }
      return {
        packages,
        booking,
        bookingRevenue,
      };
    } catch (error) {
      throw error;
    }
  }
  async getBarChart(agentId: string): Promise<AgentBarChartData[]> {
    try {
      const bookings = await this._bookingRepository.agentBookings(agentId);
      if (!bookings) {
        throw new CustomError("revenue not found", HttpStatusCode.NOT_FOUND);
      }
      const walletTransactions = await this._walletRepository.getWalletData(
        agentId
      );
      const data = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1; // Month starts at 1
        const bookingData = bookings.find((b) => b._id === month) || {
          totalBookings: 0,
        };
        const walletData = walletTransactions.find((w) => w._id === month) || {
          totalTransactions: 0,
        };

        return {
          month,
          totalBookings: bookingData.totalBookings,
          totalTransactions: walletData.totalTransactions,
        };
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async refreshAccessToken(token: string): Promise<string> {
    try {
      const incommingRefreshToken = token;
      if (!incommingRefreshToken) {
        throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);
      }
      const decoded = this._JwtService.verifyRefreshToken(incommingRefreshToken);
      if (!decoded) {
        throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);
      }
      const agent = await this._agentRepository.getAgent(decoded.userId);
      if (!agent) {
        throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);
      }
      if (incommingRefreshToken !== agent?.refreshToken) {
        throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);
      }
      const accessToken = this._JwtService.generateAccessToken(agent?._id);
      if (!accessToken) {
        throw new CustomError("Token generation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return accessToken;
    } catch (err) {
      throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);
    }
  }

  async OTPVerification(Otp: string, email: string): Promise<IAgent> {
    try {
      const OTP = await this._OTPRepository.findOTPbyEmail(email);
      if (!OTP) {
        throw new CustomError("OTP expired", HttpStatusCode.GONE);
      }
      if (OTP.otp !== Otp) {
        throw new CustomError("Incorrect OTP", HttpStatusCode.FORBIDDEN);
      }
      const agentData = await this._agentRepository.verifyAgent(email);
      if (!agentData) {
        throw new CustomError("Couldn't verify agent", HttpStatusCode.BAD_REQUEST);
      }
      return agentData;
    } catch (error) {
      throw error;
    }
  }

  async sendOTP(email: string):Promise<IOTP> {
    try {
      const existUser = await this._agentRepository.findAgentByEmail(email);
      if (!existUser) {
        throw new CustomError("Agency not exist", HttpStatusCode.NOT_FOUND);
      }
      const verificationOtp = this._generateOtp.generate();
      if (!verificationOtp) {
        throw new CustomError("Failed to generate OTP", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      await this._emailService.sendVerificationEmail(email, verificationOtp);
      const createOTP = await this._OTPRepository.createOTP({ email, otp: verificationOtp });
      if (!createOTP) {
        throw new CustomError("OTP creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return createOTP;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(email: string, password: string): Promise<IAgent> {
    try {
      const isAgent = await this._agentRepository.findAgentByEmail(email);
      if (!isAgent) {
        throw new CustomError("Invalid user", HttpStatusCode.NOT_FOUND);
      }
      const hashedPassword = await this._passwordService.passwordHash(password);
      const updatePassword = await this._agentRepository.changePassword(email, hashedPassword);
      if (!updatePassword) {
        throw new CustomError("Password not updated", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return updatePassword;
    } catch (error) {
      throw error;
    }
  }

}
