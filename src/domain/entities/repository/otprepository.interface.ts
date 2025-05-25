import IOTP from "../model/otp.interface";

export default interface IOTPRepository {
    createOTP({ email, otp }: { email: string; otp: string }): Promise<IOTP>;
    findOTPbyEmail(email: string): Promise<IOTP | null>;
  }