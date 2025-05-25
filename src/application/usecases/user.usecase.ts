import IUserUsecaseDependencies from "../../domain/entities/depencies/userdependencies.interface";
import IUser from "../../domain/entities/model/user.interface";
import IOTPRepository from "../../domain/entities/repository/otprepository.interface";
import IUserRepository from "../../domain/entities/repository/userrepository.interface";
import IWalletRepository from "../../domain/entities/repository/walletrepository.interface";
import ICloudinaryService from "../../domain/entities/services/cloudinaryservice.interface";
import IEmailService from "../../domain/entities/services/emailservice.interface";
import IGenerateOtp from "../../domain/entities/services/generateotpservice.interface";
import IJwtService from "../../domain/entities/services/jwtservice.interface";
import IPasswordService from "../../domain/entities/services/passwordservice.interface";
import IUserUseCase from "../../domain/entities/usecase/userusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";

export default class UserUseCase implements IUserUseCase {
  private _userRepository: IUserRepository;
  private _OTPRepository: IOTPRepository;
  private _walletRepository: IWalletRepository;
  private _emailService: IEmailService;
  private _passwordService: IPasswordService;
  private _generateOtp: IGenerateOtp;
  private _JwtService: IJwtService;
  private _CloudinaryService: ICloudinaryService;

  constructor(dependencies: IUserUsecaseDependencies) {
    this._userRepository = dependencies.Repositories.UserRepository;
    this._OTPRepository = dependencies.Repositories.OTPRepository;
    this._walletRepository = dependencies.Repositories.WalletRepository;
    this._emailService = dependencies.Services.EmailService;
    this._passwordService = dependencies.Services.PasswordService;
    this._generateOtp = dependencies.Services.GenerateOtp;
    this._JwtService = dependencies.Services.JwtService;
    this._CloudinaryService = dependencies.Services.CloudinaryService;
  }

  async signupUser(userData: IUser) {
    try {
      const existUser = await this._userRepository.findUserByEmail(userData.email);
      if (existUser) throw new CustomError("user already exists", HttpStatusCode.CONFLICT);

      userData.password = await this._passwordService.passwordHash(userData.password);
      const verificationOtp = this._generateOtp.generate();
      if (!verificationOtp) throw new CustomError("couldn't generate OTP", HttpStatusCode.INTERNAL_SERVER_ERROR);

      const createOTP = await this._OTPRepository.createOTP({ email: userData.email, otp: verificationOtp });
      if (!createOTP) throw new CustomError("OTP creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

      await this._emailService.sendVerificationEmail(userData.email, verificationOtp);

      const user = await this._userRepository.createUser(userData);
      if (!user) throw new CustomError("cannot signup user", HttpStatusCode.INTERNAL_SERVER_ERROR);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async signinUser(email: string, password: string) {
    try {
      const user = await this._userRepository.findUserByEmail(email);
      if (!user) throw new CustomError("Email Not Found", HttpStatusCode.NOT_FOUND);

      const verifiedPassword = await this._passwordService.verifyPassword(password, user.password);
      if (!verifiedPassword) throw new CustomError("Invalid password", HttpStatusCode.FORBIDDEN);

      if (user.is_block) throw new CustomError("user has been Blocked", HttpStatusCode.FORBIDDEN);

      if (!user.is_verified) {
        const verificationOtp = this._generateOtp.generate();
        if (!verificationOtp) throw new CustomError("couldn't generate OTP", HttpStatusCode.INTERNAL_SERVER_ERROR);

        const createOTP = await this._OTPRepository.createOTP({ email: user.email, otp: verificationOtp });
        if (!createOTP) throw new CustomError("OTP creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

        await this._emailService.sendVerificationEmail(user.email, verificationOtp);
      }

      const accessToken = this._JwtService.generateAccessToken(user._id);
      const refreshToken = this._JwtService.generateRefreshToken(user._id);
      if (!accessToken || !refreshToken) throw new CustomError("Token generation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

      await this._userRepository.updateRefreshToken(user._id, refreshToken);
      return { user, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async googleLogin(googleUser: any) {
    try {
      let user = await this._userRepository.findUserByEmail(googleUser.email);
      if (!user) {
        const userData = {
          username: googleUser.name,
          email: googleUser.email,
          password: googleUser.id,
          profile_pic: googleUser.picture,
          google_authenticated: true,
          is_verified: true,
        };
        user = await this._userRepository.createUser(userData);
        if (!user) throw new CustomError("cannot signup user", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }

      const accessToken = this._JwtService.generateAccessToken(user._id);
      const refreshToken = this._JwtService.generateRefreshToken(user._id);
      if (!accessToken || !refreshToken) throw new CustomError("Token generation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this._userRepository.getUser(userId);
      if (!user) throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId: string, userData: IUser, file: Express.Multer.File | undefined) {
    try {
      if (file) userData.profile_picture = await this._CloudinaryService.uploadImage(file);

      const user = await this._userRepository.updateProfile(userId, userData);
      if (!user) throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async validatePassword(userId: string, password: string) {
    try {
      const user = await this._userRepository.getUser(userId);
      if (!user) throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);

      const verifiedPassword = await this._passwordService.verifyPassword(password, user.password);
      if (!verifiedPassword) throw new CustomError("Invalid password", HttpStatusCode.NOT_FOUND);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(userId: string, password: string) {
    try {
      const HashedPassword = await this._passwordService.passwordHash(password);
      const user = await this._userRepository.updatePassword(userId, HashedPassword);
      if (!user) throw new CustomError("user not found", HttpStatusCode.NOT_FOUND);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(token: string): Promise<string> {
    try {
      if (!token) throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);

      const decoded = this._JwtService.verifyRefreshToken(token);
      if (!decoded) throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);

      const user = await this._userRepository.getUser(decoded.userId);
      if (!user || token !== user?.refreshToken) {
        throw new CustomError("Invalid refresh token", HttpStatusCode.UNAUTHORIZED);
      }

      const accessToken = this._JwtService.generateAccessToken(user._id);
      if (!accessToken) throw new CustomError("Token error", HttpStatusCode.INTERNAL_SERVER_ERROR);
      return accessToken;
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  }

  async OTPVerification(otp: string, email: string) {
    try {
      const OTP = await this._OTPRepository.findOTPbyEmail(email);
      if (!OTP) throw new CustomError("OTP expired", HttpStatusCode.GONE);
      if (OTP.otp !== otp) throw new CustomError("Incorrect OTP", HttpStatusCode.BAD_REQUEST);

      const userData = await this._userRepository.verifyuser(email);
      if (!userData) throw new CustomError("User not verified", HttpStatusCode.BAD_REQUEST);

      const accessToken = this._JwtService.generateAccessToken(userData._id);
      const refreshToken = this._JwtService.generateRefreshToken(userData._id);
      if (!accessToken || !refreshToken) throw new CustomError("Token generation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

      await this._walletRepository.createWallet(userData._id);
      return { userData, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async sendOTP(email: string) {
    try {
      const existUser = await this._userRepository.findUserByEmail(email);
      if (!existUser) throw new CustomError("user not exist", HttpStatusCode.CONFLICT);

      const verificationOtp = this._generateOtp.generate();
      if (!verificationOtp) throw new CustomError("Couldn't generate OTP", HttpStatusCode.INTERNAL_SERVER_ERROR);

      await this._emailService.sendVerificationEmail(email, verificationOtp);
      const createOTP = await this._OTPRepository.createOTP({ email, otp: verificationOtp });
      if (!createOTP) throw new CustomError("OTP creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

      return createOTP;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(email: string, password: string) {
    try {
      const isUser = await this._userRepository.findUserByEmail(email);
      if (!isUser) throw new CustomError("Invalid user", HttpStatusCode.NOT_FOUND);

      const hashedPassword = await this._passwordService.passwordHash(password);
      const updatePassword = await this._userRepository.changePassword(email, hashedPassword);
      if (!updatePassword) throw new CustomError("Password not updated", HttpStatusCode.INTERNAL_SERVER_ERROR);

      return updatePassword;
    } catch (error) {
      throw error;
    }
  }
}